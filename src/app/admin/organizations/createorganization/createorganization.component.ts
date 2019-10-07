import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../orgarnization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { oraganization } from 'src/app/models/organization';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createorganization',
  templateUrl: './createorganization.component.html',
  styleUrls: ['./createorganization.component.css']
})
export class CreateorganizationComponent implements OnInit {

  oraganization: oraganization = new oraganization();
  organizationForm: FormGroup;
  orgId;

  // validation messages
  validationMessages = {
    'name': {
      'required': 'Organization Name is Required'
    },
    'adminName': {
      'required': 'Admin Name is required'
    },
    'adminEmail': {
      'required': 'Admin Email is required'
    },
    'PhoneNumber': {
      'required': 'Phone is Required',
      'minlength': 'Minimum 10 Digits are Required',
      'maxlength': 'Maximum 10 Digits are Required'
    },
    'EmailID': {
      'required': 'Email is required',
      'pattern': 'Please Enter Valid Email'
    },
  };
  
  formErrors = {
    'name': '',
    'adminName': '',
    'adminEmail': ''
  }


  constructor
    (
    private route: ActivatedRoute,
    private router: Router, 
    private organizationService: OrganizationService, 
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const obj = params;
        this.orgId = obj.id;
      }
    );
    this.oraganization = new oraganization();
    this.createForm();
    if (this.orgId != 0)
      this.getOrganizationById(this.orgId);
  }

  getOrganizationById(orgId) {
    this.organizationService.getOrganizationById(orgId).subscribe(data => {
      this.oraganization = data['result'];
      this.createForm();
    });
  }


  createForm() {
    this.organizationForm = this.fb.group({
      _id: [this.oraganization._id],
      name: [this.oraganization.name, Validators.required],
      organizationCode: [this.oraganization.organizationCode],
      area: [this.oraganization.area],
      website: [this.oraganization.website],
      subArea: [this.oraganization.subArea],
      contactEmail: [this.oraganization.contactEmail],
      city: [this.oraganization.city],
      country: [this.oraganization.country],
      adminEmail: [this.oraganization.adminEmail, Validators.required],
      contactPhoneNumber: [this.oraganization.contactPhoneNumber],
      state: [this.oraganization.state],
      adminName: [this.oraganization.adminName, Validators.required],
      pinCode: [this.oraganization.pinCode],
      adminPhoneNumber: [this.oraganization.adminPhoneNumber]
    });
  }
  saveOrganization() {
    if (this.orgId == 0) {
      this.organizationService.saveOrganization(this.organizationForm.value).subscribe(data => {
        if (data['statusCode'] == "200") {
          this.toastr.success('Organization created succesfull');
          this.router.navigate(['/admin/organization']);
        }
      });
    }
    else {
      this.organizationService.updateOrganization(this.organizationForm.value).subscribe(data => {
        if (data['statusCode'] == "200") {
          this.toastr.success('Organization updated succesfull');
          this.router.navigate(['/admin/organization']);
        }
      });
    }
  }

  //Function to check Validators

  logValidationMessages(group: FormGroup = this.organizationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationMessages(abstractControl);
      }
    });
  }


  resetForm(){
    this.createForm();
  }

}
