import { Component, OnInit, OnDestroy } from '@angular/core';
import { GradeService } from './grade.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit,OnDestroy {
  dtTrigger = new Subject();
  organizations;
  grades;
  organizationId = sessionStorage.getItem('organizationId');
  constructor(
    private gradesService:GradeService,
    private organizationService: OrganizationService,
    private toaster:ToastrService,
    private router :Router) { }

  ngOnInit() {
    this.getOrganizations();
    this.getGrades();
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
  
  getGrades(){ 
    this.gradesService.getClassNames(this.organizationId).subscribe(res=>{
      this.grades = res['result'];
      this.dtTrigger.next();
    })
  } 

  deleteClass(Class){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let classDetails = { name : Class.name, isActive : false };
        this.gradesService.updateClassesByOrganizations(classDetails, Class._id).subscribe(res=>{
          this.getGrades();
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

  editClass(item,organizations){
    sessionStorage.setItem('class',JSON.stringify(item));
    this.router.navigate(['/organization/updategrade',]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
