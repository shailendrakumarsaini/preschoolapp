import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from './branch.service';
import { Subject } from 'rxjs';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  organizationId: string;
  branch: any;
  branches;
  loading: boolean = false;
  dtTrigger = new Subject();
  constructor(private branchService: BranchService, private router: Router) { 
    this.organizationId = sessionStorage.getItem('organizationId');
  }

  ngOnInit() {
    this.getAllBranches();
  }

  getAllBranches() {
    this.branchService.getBranches(this.organizationId).subscribe(data => {
      if (data != null) {
        this.branch = data;
      }
      this.dtTrigger.next();
    })
  }

  updatebranch(id) {
    this.router.navigate(['/organization/updatebranch',id]);
  }

  createBranch(){
    this.router.navigate(['/branch','/createbranch']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

}
