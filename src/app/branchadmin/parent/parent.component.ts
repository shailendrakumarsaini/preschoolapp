import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from '../teacher/teacher.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
}) 
export class ParentComponent implements OnInit,OnDestroy {
  organizationId;
  branchId;
  parentList;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private teacherService:TeacherService,private router:Router) { 
    this.organizationId = sessionStorage.getItem('organizationId');
    this.branchId = sessionStorage.getItem('branchId');
  }

  ngOnInit() {
    this.getParents();
  }

  getParents(){
    this.teacherService.getAllTeachers(this.organizationId, this.branchId, 'parent').subscribe(res=>{
      this.parentList = res['result'];
      this.dtTrigger.next();
    });
  }

  editTeacher(item){
    sessionStorage.setItem('parent',JSON.stringify(item));
    this.router.navigate(['/branch/updateparent',item._id])
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

} 
