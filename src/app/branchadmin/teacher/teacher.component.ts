import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from './teacher.service';
import { teacher } from 'src/app/models/teacher';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit,OnDestroy{

  orgId;
  branchId;
  teachers: teacher[] = [];


  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.orgId = sessionStorage.getItem('organizationId');
    this.branchId = sessionStorage.getItem('branchId');

    this.getAllTeachers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAllTeachers() {

    this.teacherService.getAllTeachers(this.orgId, this.branchId, 'teacher').subscribe(data => {
      // debugger;
      if (data['statusMessage'] == "OK") {
        this.teachers = data['result'];
      }
      this.dtTrigger.next();
      console.log(this.teachers);
    })
  }


  editTeacher(teacher){
    sessionStorage.setItem("teacherObj",teacher);
    this.router.navigate(['branch','createteacher']);
  }


}
