import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { SectionService } from './section.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit, OnDestroy {
  organizations;
  sections;
  organizationId = sessionStorage.getItem('organizationId');
  dtTrigger = new Subject();
  constructor(
    private organizationService: OrganizationService,
    private sectionService: SectionService,
    private router :Router,
    private toaster:ToastrService,) { }

  ngOnInit() { 
    this.getOrganizations();
    this.getSections();
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

  getSections(){ 
    this.sectionService.getRegisteredSectionsNames(this.organizationId).subscribe(res=>{
      this.sections = res['result'];
      this.dtTrigger.next();
    })
  }

  updateSection(item){
    sessionStorage.setItem('section',JSON.stringify(item));
    this.router.navigate(['/organization/updatesection',]);
  }

  deleteSection(section){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let sectionDetails = { name : section.name, isActive : false };
        this.sectionService.updateSectionsByOrganizations(section._id,sectionDetails).subscribe(res=>{
          this.getSections();
        },err=>{})
        Swal.fire({
          title: 'Deleted!',
          text: "Your file has been deleted.",
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
