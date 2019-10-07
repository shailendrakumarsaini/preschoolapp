import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { GradeService } from 'src/app/organizationadmin/grade/grade.service';
import { StudentService } from './student.service';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  organizationId;
  branchId;
  grades;
  dtTrigger = new Subject();
  PaymentStatus = [ "All Students", "paid", "unpaid"];
  grade = "";
  paymentStatus = "All Students";
  studentData;
  student_download_url;
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  
  constructor(private gradeService:GradeService, private studentService:StudentService) { 
    this.organizationId = sessionStorage.getItem('organizationId');
    this.branchId = sessionStorage.getItem('branchId');
  }

  ngOnInit() {
    this.gradeService.getClassNames(this.organizationId).subscribe(res=>{
      this.grades = res['result'];
      this.grade = this.grades[0]['_id'];
      console.log(this.grades);
      this.student_download_url = `${environment.devApiUrl}users/${this.branchId}/getStudentsByBranch?gradeId=${this.grade}&paymentStatus=${this.paymentStatus}&download=${true}`;
      this.studentService.getStudentsByBranch(this.branchId, this.grade, this.paymentStatus).subscribe(res=>{
        this.studentData = res['result'];
        this.dtTrigger.next();
      });
    });
  }

  filterStudent(){
    this.getStudents(this.branchId, this.grade, this.paymentStatus);
  }

  getStudents(branchId, grade, paymentStatus){
    this.rerender();
    this.studentService.getStudentsByBranch(branchId, grade, paymentStatus).subscribe(res=>{
      this.studentData = res['result'];
      this.dtTrigger.next();
    })
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
 