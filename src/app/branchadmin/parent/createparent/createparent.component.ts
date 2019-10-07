import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GradeService } from 'src/app/organizationadmin/grade/grade.service';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { BranchService } from 'src/app/organizationadmin/branch/branch.service';
import { ParentService } from '../parent.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createparent',
  templateUrl: './createparent.component.html',
  styleUrls: ['./createparent.component.css']
})
export class CreateparentComponent implements OnInit,OnDestroy {
  organizationId;
  branchId;
  organizations;
  parentForm: FormGroup;
  submmited :boolean = false;
  // gradeId;
  branch;
  sectionsList;
  shiftList;
  parentId;
  parentData;
  // validationmessages={
  //   'firstName': {
  //     'required': 'firstName Name is Required',
  //     'minlength':' Atleast 5 Characters is Required' 
  //   },
  //   'middleName':{
  //     'required': 'MiddleName is Required'
  //   },
  //   'lastName':{
  //     'required': 'lastName is Required'
  //   },
  //   'mobileNumber':{
  //     'required': 'mobileNumber is Required',
  //     'minlength': 'Atleast 10 digit is Required'
  //   },
  //   'landLineNumber':{
  //     'required': 'landLineNumber is Required'
  //   },
  //   'email':{
  //     'required': 'email is Required',
  //     'pattern' : 'Please Provide valid Email '
  //   },
  //   'age':{
  //     'required': 'age is Required',
  //     'maxlength': 'Not more than 2 digits',
  //   },
  //   'spouseFirstName':{
  //     'required': 'spouseFirstName is Required'
  //   },
  //   'spouseLastName':{
  //     'required': 'spouseLastName is Required'
  //   },
  //   'spousePhoneNo':{
  //     'required': 'spousePhoneNo is Required'
  //   },
  //   'spouseEmailID':{
  //     'required': 'spouseEmailID is Required',
  //     'pattern' : 'Please Provide valid Email '
  //   },
  //   'address':{
  //     'required': 'address is Required'
  //   },
  //   'enrollmentCode':{
  //     'required': 'enrollmentCode is Required'
  //   },
  //   'classId':{
  //     'required': 'Class Id is Required'
  //   }, 
  //   'gender':{
  //     'required': 'Gender is Required'
  //   },
  //   'gradeId':{
  //     'required': 'Grade is Required'
  //   },
  //   'sectionId':{
  //     'required': 'Section is Required'
  //   },
  //   'shiftId':{
  //     'required': 'Shift is Required'
  //   }
  // };
  // formErrors={
  //   'firstName':'',
  //   'lastName':'',
  //   'mobileNumber':'',
  //   'landLineNumber':'',
  //   'email':'',
  //   'age':'',
  //   'spouseFirstName' : '' ,
  //   'spouseLastName':'',
  //   'spousePhoneNo':'',
  //   'spouseEmailID':'',
  //   'address':'',
  //   'enrollmentCode':'',
  //   'middleName':'',
  //   'gender':'',
  //   'gradeId':'',
  //   'sectionId':'',
  //   'shiftId':'',
  // }
  validationmessages={
    'firstName': {
      'required': 'firstName  is Required',
      'minlength':' Atleast 3 Characters is Required' 
    },
    'lastName': {
      'required': 'lastName  is Required',
      'minlength':' Atleast 5 Characters is Required' 
    },
    'mobileNumber': {
      'required': 'mobileNumber is Required',
      'minlength': 'Minimum 10 Numbers are Required' 
    },
    // 'countryCode': {
    //   'required': 'countryCode is Required',
    //   'minlength':' Atleast 2 Characters is Required' 
    // },
    // 'role': {
    //   'required': 'role is Required',
    //   'minlength':' Atleast 5 Characters is Required' 
    // },
    // 'appName': {
    //   'required': 'appName is Required',
    //   'minlength':' Atleast 5 Characters is Required' 
    // },
    'email': {
      'required': 'email is Required',
      'pattern':'Provide Valid Email Address' 
    },
    'platform': {
      'required': 'platform is Required',
       
    },
    'kidName': {
      'required': 'firstName is Required',
      'minlength':' Atleast 5 Characters is Required' 
    },
    'kidAge': {
      'required': 'kidAge is Required',
      'minlength':' Atleast 2 digit is Required' 
    },
    'kidGender': {
      'required': 'kidGender is Required',
       
    },
    'organizationId': {
      'required': 'organizationId is Required',
       
    },
    'gradeId': {
      'required': 'gradeId is Required',
       
    },
    'profileImage': {
      'required': 'profileImage is Required',
       
    },
  }
  formErrors={
    'firstName':'',
    'lastName':'',
    'mobileNumber':'',
    'countryCode':'',
    'role':'',
    'appName':'',
    'email':'',
    'platform':'',
    'kidName':'',
    'kidAge':'',
    'kidGender':'',
    'organizationId':'',
    'gradeId':'',
    'profileImage':'',
  }
  constructor( 
    private fb:FormBuilder,  
    private gradeService:GradeService,
    private organizationService:OrganizationService,
    private branchService:BranchService,
    private parentService:ParentService,
    private toaster:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    ) { 
      this.parentId = this.activatedRoute.snapshot.paramMap.get('id');
      this.organizationId = sessionStorage.getItem('organizationId'); 
      this.branchId = sessionStorage.getItem('branchId'); 
   }

  ngOnInit() {
    this.createForm();
    this.getOrganizations();
    this.getBranch();
    this.getGrades(); 
    if(this.parentId){
      // this.parentService.getParent(this.parentId).subscribe(res=>{
      //   this.parentData = res['result'];
      //   console.log(this.parentData);
      //   this.populatewithFormData();
      // })
      this.parentData = JSON.parse(sessionStorage.getItem('parent'));
      console.log(this.parentData);
      this.populatewithFormData();
    }

    this.parentForm.valueChanges.subscribe(value=>{
        this.logValidationMessages();
    });
  }

  onSubmit(){
    this.submmited = true;
    this.logValidationMessages();
    if(this.parentForm.valid){
      this.parentService.createParent(this.parentForm.value).subscribe(res=>{
        if(res['statusMessage'] == 'OK'){
          this.toaster.success('Parent Created Successfully');
          this.router.navigate(['/branch/parent']);
        }
      });
    }
  }

  populatewithFormData(){
    this.parentForm.patchValue({
      firstName : this.parentData.firstName,
      lastName : this.parentData.lastName,
      mobileNumber : this.parentData.mobileNumber,
      email : this.parentData.email,
      // countryCode : this.parentData.countryCode,
      // kidName : this.parentData.kidName,
      // kidAge : this.parentData.kidAge,
      // kidGender : this.parentData.kidGender,
      // organizationId: this.organizationId,
      // gradeId : this.parentData.gradeId,
      // profileImage:  this.parentData.profileImage,
    });
  }
  
  // changeGrade(event){
  //   this.parentForm.get('student').patchValue({
  //     sectionId : null,
  //     shiftId : null
  //   });
  //   let gradeId = event.srcElement.value;
  //   for (let i = 0; i < this.grades.length; i++) {
  //     if (this.grades[i].gradeId._id == gradeId) {
  //       this.parentForm.get('student').patchValue({
  //         classId : this.grades[i]._id
  //       });
  //       this.sectionsList = this.grades[i].classSectionId
  //       // console.log("sections :", this.sectionsList);
  //     }
  //   }
  // }

  changeSection(event){
    this.parentForm.get('student').patchValue({
      shiftId : null
    });
    let sectionId = event.srcElement.value;
    for (let i = 0; i < this.sectionsList.length; i++) {
      if (this.sectionsList[i].sectionId._id == sectionId) {
        this.shiftList = this.sectionsList[i].shiftId;
        // console.log("shiftList :", this.shiftList);
      }
    }
  }


  getGrades(){ 
    this.gradeService.getClassesByBranches(this.organizationId, this.branchId).subscribe(res=>{
      // this.gradeId = res['result'][0]['gradeId']['_id'];
      this.parentForm.patchValue({
        gradeId : res['result'][0]['gradeId']['_id']
      })
    });
  }

  // createForm(){
  //   this.parentForm = this.fb.group({
  //     parent : this.fb.group({
  //       firstName:[null,[Validators.required]], 
  //       lastName:[null], 
  //       age:[null], 
  //       email:[null,[Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  //       address:[null],
  //       landLineNumber:[null], 
  //       mobileNumber:[null,[Validators.maxLength(10),Validators.minLength(10)]], 
  //       enrollmentCode:[null,[Validators.required]],
  //       spouseFirstName:[null], 
  //       spouseLastName:[null], 
  //       spousePhoneNo:[null], 
  //       spouseEmailID:[null,[Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  //     }),
  //   student : this.fb.group({
  //     firstName:[null,[Validators.required]], 
  //     middleName:[null], 
  //     lastName:[null], 
  //     age:[null], 
  //     gender:[null,[Validators.required]], 
  //     classId:[null,[Validators.required]],
  //     gradeId:[null,[Validators.required]], 
  //     sectionId:[null,[Validators.required]], 
  //     shiftId:[null,[Validators.required]], 
  //   }),
  //   role:['parent',Validators.required],
  //   branchId:[this.branchId, Validators.required],
  //   organizationId:[this.organizationId, Validators.required],
  //  })
  // }



  createForm(){
    this.parentForm=this.fb.group({
      firstName:[null,[Validators.required]],
      lastName:[null],
      mobileNumber:[null,[Validators.maxLength(10),Validators.minLength(10)]],
      countryCode:['+91',[Validators.required]],
      role:['parent',[Validators.required]],
      appName:['My Preschool App',[Validators.required]],
      email:[null,[Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      platform:[null],
      kidName:[null,[Validators.required]],
      kidAge:[null,[Validators.required]],
      kidGender:[null,[Validators.required]],
      organizationId:[this.organizationId,[Validators.required]],
      gradeId:[null,[Validators.required]],
      profileImage:[null,[Validators.required]],
    })
  }

  logValidationMessages(group: FormGroup = this.parentForm): void {
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
      if (abstractControl instanceof FormGroup) {
        this.logValidationMessages(abstractControl);
      } 
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationMessages(control);
          }
        }
      }
    });
  }

  getOrganizations(){ 
    this.organizationService.getOrganizations().subscribe(res=>{
      for (let i = 0; i < res['result'].length; i++) {
        if (sessionStorage.getItem('organizationId') == res['result'][i]._id) {
          this.organizations = res['result'][i];
        }
      }
    }); 
  }

  getBranch(){
    this.branchService.getBranches(this.organizationId).subscribe(res=>{
      for (var i = 0; i < res['result'].length; i++) {
        if (this.branchId == res['result'][i]._id) {
          this.branch = res['result'][i];
        }
      }
    });
  }

  ngOnDestroy(){
    sessionStorage.removeItem('parent');
  }

}
