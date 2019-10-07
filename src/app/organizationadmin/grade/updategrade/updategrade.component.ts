import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GradeService } from '../grade.service';
import { BranchService } from '../../branch/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';

@Component({
  selector: 'app-updategrade',
  templateUrl: './updategrade.component.html',
  styleUrls: ['./updategrade.component.css']
})
export class UpdategradeComponent implements OnInit, OnDestroy {

  organizations;
  organizationId = sessionStorage.getItem('organizationId');
  branches;
  GradeModel = JSON.parse(sessionStorage.getItem('class'))['name'];
  Grade = JSON.parse(sessionStorage.getItem('class'));
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

  resetForm(){
    this.GradeModel = null
    // console.log(this.form)
    // this.form.resetForm();
  }

  onUpdate(data){
    // console.group(data)
    let classDetails = {
      name : data.Grade
    }
    debugger
    this.gradesService.updateClassesByOrganizations(classDetails, this.Grade._id).subscribe(res=>{
      this.toaster.success("Grade details updated successfully");
      this.router.navigate(['/organization/grade']);
    },err =>{
      this.toaster.error('Failed to update Grade details.');
    })
  }

  ngOnDestroy(){
    sessionStorage.removeItem('class');
  }

}
