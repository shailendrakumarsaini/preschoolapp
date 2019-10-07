import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-createteacher',
  templateUrl: './createteacher.component.html',
  styleUrls: ['./createteacher.component.css']
})
export class CreateteacherComponent implements OnInit {

  teacherForm: FormGroup;
  teacher: teacher;
  Section;




  validationMessages = {
    'firstName': {
      'required': 'Organization Name is Required'
    },
    'mobileNumber': {
      'required': 'Admin Email is required'
    },
    'role': {
      'required': 'Role is required'
    },
    'appName': {
      'required': 'AppName is required'
    },
    'organizationId': {
      'required': 'Organization Id is required'
    },
    'gradeId': {
      'required': 'Grade Id is required'
    },
    'branchId': {
      'required': 'Branch Id is required'
    },
  };
  formErrors = {
    'firstName': '',
    'mobileNumber': '',
    'role': '',
    'appName': '',    
    'organizationId': '',
    'gradeId': '',
    'branchId': ''
  }


  //Function to check Validators

  logValidationMessages(group: FormGroup = this.teacherForm): void {
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

  constructor(private fb: FormBuilder, private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacher = new teacher();
    this.createForm();
  }



  
  createForm() {
    debugger;
    this.teacherForm = this.fb.group({
      _id: [this.teacher._id],
      firstName: ['', Validators.required],
      mobileNumber: [''],
      role: ['',Validators.required],
      // email: [this.teacher.email],
      appName: ['',Validators.required],
      organizationId: ['',Validators.required],
      gradeId: ['',Validators.required],
      branchId: ['',Validators.required],
    });
  }

   teacherDetails;
  saveTeacher(){
    this.teacherService.save(this.teacherForm.value).subscribe(data=>{
      this.teacherDetails = data;
    });
  }

  updateTeacher(){
    this.teacherService.updateTeacher(this.teacherForm.value).subscribe(data=>{

    });
  }

  resetForm(){
    this.Section = null
    // console.log(this.form)
    // this.form.resetForm();
  }

}
