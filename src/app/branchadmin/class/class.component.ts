import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  organizations

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.getOrganizations();
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

}
