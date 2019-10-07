// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-createsection',
//   templateUrl: './createsection.component.html',
//   styleUrls: ['./createsection.component.css']
// })
// export class CreatesectionComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../section.service';
import { BranchService } from '../../branch/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';


@Component({
  selector: 'app-createsection',
  templateUrl: './createsection.component.html',
  styleUrls: ['./createsection.component.css']
})
export class CreatesectionComponent implements OnInit {
  sections;
  organizationId = sessionStorage.getItem('organizationId');
  Section;
  @ViewChild('form',{static :true}) form;

  constructor(
    private sectionsService: SectionService,
    private organizationService: OrganizationService,
    private toaster:ToastrService,
    private router :Router) { }

  ngOnInit() {
    this.getSections();
  }

  getSections(){ 
    this.organizationService.getOrganizations().subscribe(res=>{
      for (let i = 0; i < res['result'].length; i++) {
        if (sessionStorage.getItem('organizationId') == res['result'][i]._id) {
          this.sections = res['result'][i];
        }
      }
    });
  }

  onSubmit(data){
    if(this.sections){
      var tmp = {
          organizationId : this.organizationId, 
          name : data.Section
        }
      this.sectionsService.CreateSectionsByOrganizations(tmp).subscribe(res=>{
        this.toaster.success("Section "+data.Section+" has been created successfully");
        this.router.navigate(['/organization/section']);
      },err=>this.toaster.error('Failed to register the class name which already exists'));
    }else {
          this.toaster.error('Please select Organization');
      }
  }

  resetForm(){
    this.Section = null
    // console.log(this.form)
    // this.form.resetForm();
  }

}

