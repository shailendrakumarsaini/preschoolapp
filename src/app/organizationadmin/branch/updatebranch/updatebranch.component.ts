import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatebranch',
  templateUrl: './updatebranch.component.html',
  styleUrls: ['./updatebranch.component.css']
})
export class UpdatebranchComponent implements OnInit {
  branchId;
  branchDetails;
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
    private branchService: BranchService, 
    private fb: FormBuilder, 
    private toaster :ToastrService,
    private router :Router,
    private ActivatedRoute:ActivatedRoute) { 
      this.branchId = this.ActivatedRoute.snapshot.paramMap.get('branchId');
      this.branchDetails = this.ActivatedRoute.snapshot.data['branchDetails']['result'][0];
      this.datePickerConfig = Object.assign({},
        {
          containerClass: 'theme-dark-blue',
          showWeekNumbers: false,
          dateInputFormat: 'DD/MM/YYYY'
        });
    }
    

  ngOnInit() { 
    this.branchForm = this.fb.group({
      organizationId: [this.branchDetails._id, Validators.required],
      branchType: [this.branchDetails.branchType, Validators.required],
      adminPhoneNumber: [this.branchDetails.adminPhoneNumber],
      name: [this.branchDetails.name, Validators.required],
      adminEmail: [this.branchDetails.adminEmail, [Validators.required, Validators.email]],
      website: [this.branchDetails.website],
      area: [this.branchDetails.area],
      contactPhoneNumber: [this.branchDetails.contactPhoneNumber],
      subArea: [this.branchDetails.subArea],
      contactLandLine: [this.branchDetails.contactLandLine],
      city: [this.branchDetails.city],
      contactEmail: [this.branchDetails.contactEmail],
      state: [this.branchDetails.state],
      adminName: [this.branchDetails.adminName, Validators.required],
      country: [this.branchDetails.country],
      pinCode: [this.branchDetails.pinCode],
      academicYearStart: [new Date(this.branchDetails.academicYearStart), Validators.required],
      academicYearEnd: [new Date(this.branchDetails.academicYearEnd), Validators.required],
      branchCode: [this.branchDetails.branchCode],
      // password: [this.branchDetails., Validators.required]
    });

    this.branchForm.valueChanges.subscribe(value=>{
      this.logValidationMessages();
    })
  }

  onUpdate(){
    this.submmited = true;
    this.logValidationMessages();
    this.branchForm.value
    debugger
    if(this.branchForm.valid){
      this.branchService.updateBranch(this.branchId, this.branchForm.value).subscribe(res=>{
        if(res['statusMessage']){
          this.toaster.success("Branch updated successfully");
          this.router.navigate(['/organization/branch']);
        } 
      });
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
      });
    }


 
}
