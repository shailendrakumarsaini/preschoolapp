import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BranchadminComponent } from './branchadmin/branchadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassComponent } from './class/class.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ParentComponent } from './parent/parent.component';
import { StudentComponent } from './student/student.component';
import { CreateteacherComponent } from './teacher/createteacher/createteacher.component';
import { UpdatestudentComponent } from './student/updatestudent/updatestudent.component';
import { UpdatebranchComponent } from './updatebranch/updatebranch.component';
import { CreateparentComponent } from './parent/createparent/createparent.component';
import { UpdatebranchResolveService } from './updatebranch/updatebranch.resolve.service';
import { NumberDirective } from '../shared/directives/numbersOnly.directive';

const appRoutes: Routes = [
  { path : '', component : BranchadminComponent, children : 
    [
      { path : 'dashboard' , component: DashboardComponent },
      { path : 'class' , component: ClassComponent },
      { path : 'teacher' , component: TeacherComponent },
      { path : 'createteacher' , component: CreateteacherComponent },
      { path : 'parent' , component: ParentComponent },
      { path : 'createparent' , component: CreateparentComponent },
      { path : 'updateparent/:id' , component: CreateparentComponent },
      { path : 'student' , component: StudentComponent },
      { path : 'updatestudent/:id' , component: UpdatestudentComponent },
      { path : 'updatebranch/:branchId', component: UpdatebranchComponent, resolve : { branchDetails : UpdatebranchResolveService} },
      { path : '' , redirectTo : 'dashboard', pathMatch :'full' },
      { path : '**' , component: DashboardComponent },
    ]
  }
] 


@NgModule({
  declarations: [
    BranchadminComponent, 
    DashboardComponent, 
    ClassComponent, 
    TeacherComponent,
    CreateteacherComponent, 
    ParentComponent, 
    StudentComponent, 
    UpdatestudentComponent, 
    UpdatebranchComponent, 
    CreateparentComponent,
    NumberDirective,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
    BsDatepickerModule.forRoot()
  ]
})
export class BranchadminModule { }
