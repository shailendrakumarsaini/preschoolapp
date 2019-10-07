import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-updatesection',
  templateUrl: './updatesection.component.html',
  styleUrls: ['./updatesection.component.css']
})
export class UpdatesectionComponent implements OnInit, OnDestroy {

  organizations;
  organizationId = sessionStorage.getItem('organizationId');
  SectionModel = JSON.parse(sessionStorage.getItem('section'))['name'];
  Section = JSON.parse(sessionStorage.getItem('section'));
  @ViewChild('form',{static :true}) form;
   
  constructor(
    private sectionService: SectionService,
    private organizationService: OrganizationService,
    private toaster:ToastrService,
    private router :Router) { }
 
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

  resetForm(){
    this.SectionModel = null
  }

  onUpdate(data){
    this.sectionService.updateSectionsByOrganizations(this.Section._id, {name : data.Section}).subscribe(res=>{
      this.toaster.success("Section details updated successfully");
      this.router.navigate(['/organization/section']);
    },err =>{
      this.toaster.error('Failed to update Section details.');
    })
  }

  ngOnDestroy(){
    sessionStorage.removeItem('section');
  }

}

 