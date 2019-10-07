import { Component, OnInit, ViewChild } from '@angular/core';
import { GradeService } from '../grade.service';
import { BranchService } from '../../branch/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';

@Component({
  selector: 'app-creategrade',
  templateUrl: './creategrade.component.html',
  styleUrls: ['./creategrade.component.css']
})
export class CreategradeComponent implements OnInit {
  organizations;
  organizationId = sessionStorage.getItem('organizationId');
  branches;
  Grade;
  @ViewChild('form',{static :true}) form;
  constructor(
    private gradesService: GradeService,
    private organizationService: OrganizationService,
    private branchService: BranchService, 
    private toaster:ToastrService,
    private router :Router) { }

  ngOnInit() {
    this.getOrganizations();
    // this.getBranches();
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
    })
  }

  onSubmit(data){
    if(this.organizations){
      var tmp = {
          organizationId : this.organizationId,
          name : data.Grade
        }
      this.gradesService.CreateClassesByOrganizations(tmp).subscribe(res=>{
        this.toaster.success("Grade "+data.Grade+" has been created successfully");
        this.router.navigate(['/organization/grade']);
      },err=>this.toaster.error('Failed to register the class name which already exists'));
    }else {
          this.toaster.error('Please select Organization');
      }
  }

  resetForm(){
    this.Grade = null
    // console.log(this.form)
    // this.form.resetForm();
  }

}
