import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GradeService } from 'src/app/organizationadmin/grade/grade.service';
import { TeacherService } from '../../teacher/teacher.service';

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit {
  studentId;
  branchId;
  studentInfo;
  studentForm: FormGroup;
  organizationId;
  grades;
  user;
  submmited: boolean = false;
  validationmessages = {
    'firstName': {
      'required': 'First Name is Required'
    },
    'middleName': {
      'required': 'middleName is Required'
    },
    'lastName': {
      'required': 'lastName is Required'
    },
    'grade': {
      'required': 'grade is Required'
    },
    'gender': {
      'required': 'gender is Required'
    },

    'age': {
      'required': 'age is Required'
    },

    'parentFullName': {
      'required': 'parentFullName is Required'
    },
    'section': {
      'required': 'section is Required'
    },
    'shift': {
      'required': 'shift is Required'
    },

  };
  formErrors = {
    'firstName': '',
    'middleName': '',
    'lastName': '',
    'age': '',
    'gender': '',
    'parentFullName': '',
    'grade': '',
    'section': '',
    'shift': '',
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private gradeService: GradeService,
    private teacherService: TeacherService
  ) {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.organizationId = sessionStorage.getItem('organizationId');
    this.branchId = sessionStorage.getItem('branchId');
  }

  ngOnInit() {
    this.getStudentInfo();
    this.getGrades();
    this.makeForm();
  }

  makeForm() {
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null],
      age: [null],
      gender: [null, Validators.required],
      parentFullName: [null],
      grade: [null, Validators.required],
      section: [null, Validators.required],
      shift: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submmited = true;
    this.logValidationMessages();
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      console.log(this.user);
      // this.user.firstName = this.user.firstName;
      // console.log(this.user);

      // this.studentService.updateStudent().subscribe(res=>{
      //   console.log(res);
      // });
    }
  }

  getGrades() {
    this.gradeService.getClassesByBranches(this.organizationId, this.branchId).subscribe(res => {
      this.grades = res['result'];
    });
  }

  getStudentInfo() {
    this.studentService.getUserInfo(this.studentId).subscribe(res => {
      this.studentInfo = res['result'];
      this.populateStudentValue();
      this.getUserProfile();
    });
  }

  getUserProfile(){
    this.teacherService.getUserProfile(this.studentInfo._id, this.studentInfo.role).subscribe(res=>{
      this.user = res['result'];
      if(this.user.student && this.user.student.parentId && this.user.student.parentId[0]){
        this.studentForm.patchValue({
          grade : this.user.student.gradeId.name,
          section : this.user.student.sectionId._id,
          shift : this.user.student.shiftId._id,
          parentFullName :`${this.user.student.parentId[0].firstName} ${this.user.student.parentId[0].lastName}`
        });
      }
    });
  }

  populateStudentValue(){
    this.studentForm.patchValue({
      firstName : this.studentInfo.firstName,
      middleName : this.studentInfo.middleName,
      lastName : this.studentInfo.lastName,
      age : this.studentInfo.age,
      gender : this.studentInfo.gender,
    });
  }

  logValidationMessages(group: FormGroup = this.studentForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
        const messages = this.validationmessages[key];
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


}
