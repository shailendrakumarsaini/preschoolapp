import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { BranchService } from '../branch/branch.service';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  organizationId;
  organizations;
  branches;
  loading = false;
  branchModel = "";
  constructor(
    private organizationService :OrganizationService,
    private branchService :BranchService,
    private reportService :ReportService,
    ) {
      this.organizationId = sessionStorage.getItem('organizationId');
    }

  ngOnInit() {
    this.getOrganizations();
    this.getBranches();
  }

  changeBranch(branchId){
    debugger
    this.reportService.getStudentsReportsData(this.organizationId, branchId).subscribe(res =>{
      debugger
    })
  }

  getOrganizations(){
    this.loading = true;
    this.organizationService.getOrganizations().subscribe(res=>{
      for (let i = 0; i < res['result'].length; i++) {
        if (sessionStorage.getItem('organizationId') == res['result'][i]._id) {
          this.organizations = res['result'][i];
        }
      }
      this.loading = false;
    },err => this.loading = false);
  }

  getBranches(){
    this.loading = true;
    this.branchService.getBranches(this.organizationId).subscribe(res=>{
      this.branches = res['result'];
      this.loading = false;
    },err => this.loading = false);
  }

}
