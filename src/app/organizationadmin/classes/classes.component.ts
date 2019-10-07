import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/organizationadmin/grade/grade.service';
import { SectionService } from 'src/app/organizationadmin/section/section.service';
import { ShiftService } from 'src/app/organizationadmin/shift/shift.service'
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { BranchService } from '../branch/branch.service';
import { ClassService } from './class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  organizationId;
  grades;
  sections;
  shifts;
  classForm: FormGroup;
  organizations;
  branches;

  constructor(
    private organizationService:OrganizationService,
    private branchService:BranchService,
    private gradeService:GradeService,
    private sectionService:SectionService,
    private shiftService:ShiftService,
    private classService:ClassService,
    private fb :FormBuilder,
    private toastr :ToastrService,
    private router :Router
    ){
    this.organizationId = sessionStorage.getItem('organizationId');
  }

  ngOnInit(){
    this.createForm();
    this.getOrganizations();
    this.getBranches();
    this.getAllGrades();
    this.getSectionNames();
    this.getShiftNames();
    
  }

  onSubmit(){
    if(this.classForm.valid){
      console.log(this.classForm.value);
      this.classService.createClass(this.classForm.value).subscribe(res=>{
        console.log(res);
        if(res['statusMessage'] == 'OK'){
          this.toastr.success("Class has been created successfully");
          this.router.navigate(['/organization/dashboard']);
        }
      });
    }
  }

  createForm(){
    this.classForm = this.fb.group({
      organizationId: [this.organizationId,Validators.required],
      branchId: [null,Validators.required],
      gradeId: [null,Validators.required],
      sectionDetails: this.fb.array([this.createSectionDeatilsArray()])
    })
  } 

  createSectionDeatilsArray(){
    return this.fb.group({
      sectionId: [null,Validators.required],
      shiftId : this.fb.array([this.pushElementToShiftIdArray()])
    });
  }

  pushElementToShiftIdArray(){
    return new FormControl(null,Validators.required);
  }

  addGroup(){
    (<FormArray>this.classForm.get('sectionDetails')).push(this.createSectionDeatilsArray());
  }


  deleteGroup(id){
    (<FormArray>this.classForm.get('sectionDetails')).removeAt(id);
   
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

  getBranches(){
    this.branchService.getBranches(this.organizationId).subscribe(res=>{
      this.branches = res['result'];
    });
  }

  getAllGrades(){
    this.gradeService.getClassNames(this.organizationId).subscribe(res=>{
      this.grades = res['result'];
    })
  }

  getSectionNames(){
    this.sectionService.getRegisteredSectionsNames(this.organizationId).subscribe(res=>{
     this.sections = res['result'];
     if(this.sections.length > 0)
     (<FormControl>(<FormArray>(<FormArray>this.classForm.get('sectionDetails')).controls[0]).controls['sectionId']).setValue(this.sections[0]['_id']);
    })
  }

  getShiftNames(){
    this.shiftService.getAllShifts(this.organizationId).subscribe(res=>{
      this.shifts = res['result'];     
      if(this.shifts.length > 0) 
      (<FormArray>(<FormArray>(<FormArray>this.classForm.get('sectionDetails')).controls[0]).controls['shiftId']).setValue([this.shifts[0]['_id']]);
    })
  }

}
