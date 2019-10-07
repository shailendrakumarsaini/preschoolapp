import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublisherService } from '../publisher.service';
import { Publisher } from 'src/app/models/publisher';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { OrganizationService } from '../../organizations/orgarnization.service';

@Component({
  selector: 'app-createpublisher',
  templateUrl: './createpublisher.component.html',
  styleUrls: ['./createpublisher.component.css']
})
export class CreatepublisherComponent implements OnInit, OnDestroy {

  publisher: Publisher = new Publisher();
  publisherList: Publisher[] = [];
  publisherForm: FormGroup;
  publisherId
  orgarnizationList;


  validationMessages = {
    'name': {
      'required': 'Publisher Name is Required'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Invalid email'
    },
    'mobileNumber': {
      'required': 'Contact Number is required',
      'minlength': 'Minimum 10 Digits are Required',
      'maxlength': 'Maximum 10 Digits are Required'
    }
  };
  formErrors = {
    'name': '',
    'email': '',
    'mobileNumber': ''
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private publisherService: PublisherService,
    private fb: FormBuilder, 
    private toaster: ToastrService,
    private organizationService:OrganizationService) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        const obj = params;
        this.publisherId = obj.id;
      }

    );

    this.getAllOrganizations();

    if (this.publisherId != 0) {
      this.publisher = JSON.parse(sessionStorage.getItem("publisher"));
      this.createForm();
    }
    else{
      this.createForm();
    }
    
  }

  ngOnDestroy() {
    sessionStorage.removeItem("publisher");
  }

  getAllPublishers() {
    this.publisherService.getPublishers().subscribe(data => {
      this.publisherList = data['result']; 
    });
  }

  getAllOrganizations(){
    this.organizationService.getOrganizations().subscribe(res=>{
      this.orgarnizationList = res['result'];
    }) 
  }

  createPublisher() {
    debugger
    if (this.publisher._id == null || this.publisher._id == '') {
      this.publisherService.savePublisher(this.publisherForm.value).subscribe(data => {
        if (data['statusMessage'] = "OK") {
          this.toaster.success('Successfully created');
          this.router.navigate(['/admin/createpublisher/',0]);
        }
      });
    }
    else
      this.updtePublisher();
  }

  updtePublisher() {
    this.publisherService.updatePublisher(this.publisherForm.value).subscribe(data => {
      if (data['statusMessage'] = "OK") {
        this.toaster.success('Successfully updated');
        this.router.navigate(['/admin/publisher/',0]);
      }
    });
  }


  createForm() {
    this.publisherForm = this.fb.group({
      _id: [this.publisher._id = this.publisher._id == "" ? null : this.publisher._id],
      description: [this.publisher.description],
      name: [this.publisher.name, Validators.required],
      email: [this.publisher.email, [Validators.required, Validators.email]],
      mobileNumber: [this.publisher.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      organizationId: [this.publisher.organizationId],
      //userId: [this.publisher.mobileNumber]
    });
  }

  reset() {
    this.createForm();
  }

  logValidationMessages(group: FormGroup = this.publisherForm): void {
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
}
