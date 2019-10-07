import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/models/branch';
import { BranchService } from '../branch.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createbranch',
  templateUrl: './createbranch.component.html',
  styleUrls: ['./createbranch.component.css']
})
export class CreatebranchComponent implements OnInit {
  submmited :boolean = false;
  branchForm: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  validationMessages  = {
    'branchType' : {
                    'required': 'Branch Type is required.'
                  },
    'adminPhoneNumber' : {
                      'required': 'PhoneNumber is Required'
                    },
    'name' : {
                    'required': 'Branch Name is Required',
                    'minlength': '5 Characters is Required'
                  },
    'adminEmail' : {
                      'required': 'Eamil is Required',
                      'minlength': '3 Characters is Required',
                      'email': 'Email must be valid email.'
                    },
    'website' : {
                      'required': 'Website is Required'
                    },
    'area' : {
              'required': 'Area is Required',
              'minlength': '4 Digits are Required',
            },
    'contactPhoneNumber' :  {
                      'required': 'PhoneNumber is Required',
                      'minlength': 'Minimum 10 Digits are Required',
                      'maxlength': 'Maximum 10 Digits are Required'
                    },
    'contactLandLine' :  {
                      'required': 'LandLine is Required',
                      'minlength': 'Minimum 10 Digits are Required',
                      'maxlength': 'Maximum 10 Digits are Required'
                    },
    'subArea' : {
                  'required': 'Sub Area is required',
                  'pattern' : 'Please Enter Valid Email'
                },
    'city' : {
                  'required': 'City is required',
                  'minlength': '5 Characters are Required'
                },
    'contactEmail' : {
                      'required': 'Eamil is Required',
                      'minlength': '3 Characters is Required',
                      'email': 'Email must be valid email.'
                    },
    'branchCode' : {
                  'required': 'Branch Code is Required',
                  'minlength': 'Minimum 5 Digits are Required'
                },
    'password': {
                    'required': 'Password is Required'
                  },
    'state': {
                'required': 'State is Required.'
            },
    'adminName': {
                'required': 'Admin Name is Required.'
            },
    'country': {
                  'required': 'Country is Required.'
                },
    'pinCode': {
                  'required': 'PinCode is Required.'
                },
    'Vendor': {
                'required': 'Vendor is Required.'
              },
    'academicYearStart': {
                          'required': 'Academic Start Year is Required'
                    },
    'academicYearEnd' : {
                          'required': 'Academic End Year Date is Required'
                        }
  };

  formErrors = {
    'branchType' : '',
    'adminPhoneNumber' : '',
    'name' : '',
    'adminEmail' : '',
    'website' : '',
    'area' : '',
    'contactPhoneNumber' : '',
    'subArea' : '',
    'contactLandLine' : '',
    'city' : '',
    'contactEmail' : '',
    'branchCode': '',
    'password': '',
    'state': '',
    'adminName': '',
    'country': '',
    'pinCode': '',
    'academicYearStart': '',
    'academicYearEnd' : ''
  };

  constructor(
    private fb: FormBuilder, 
    private branchService: BranchService,
    private toaster :ToastrService,
    private router :Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
    this.branchForm = this.fb.group({
      organizationId: [sessionStorage.getItem("organizationId"), Validators.required],
      branchType: ['COCO', Validators.required],
      adminPhoneNumber: [null],
      name: [null, Validators.required],
      adminEmail: [null, [Validators.required, Validators.email]],
      website: [null],
      area: [null],
      contactPhoneNumber: [null],
      subArea: [null],
      contactLandLine: [null],
      city: [null],
      contactEmail: [null],
      state: [null],
      adminName: [null, Validators.required],
      country: [null],
      pinCode: [null],
      academicYearStart: [null, Validators.required],
      academicYearEnd: [null, Validators.required],
      branchCode: [null],
      password: ['kkel123', Validators.required]
    });

    this.branchForm.valueChanges.subscribe(value=>{
      this.logValidationMessages();
    })
  }

  onSubmit(){
    this.submmited = true;
    this.logValidationMessages();
    if(this.branchForm.valid){
      this.branchService.createBranches(this.branchForm.value).subscribe(res=>{
        if(res['statusMessage']){
          this.toaster.success("Branch created successfully");
          this.router.navigate(['/organization/branch']);
        } 
      })
    }
  }
  
  logValidationMessages(group: FormGroup = this.branchForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          // if (abstractControl instanceof FormGroup) {
          //   this.logValidationMessages(abstractControl);
          // } 
      });
  }
 
  changeDateFormat(date){ 
    if(date)
      {
        if((date.getMonth() + 1) <= 9){
          var month = '0'+(date.getMonth() + 1);
        }else{
          month = '' + (date.getMonth() + 1);
        }

        if((date.getDate()) <= 9){
          var day = '0'+(date.getDate());
        }else{
          day = '' + date.getDate();
        }

        return  date.getFullYear() + '-' + month + '-' + day;
      }
  }


}
