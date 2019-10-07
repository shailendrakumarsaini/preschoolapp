import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';


import { DashboardComponent } from './dashboard/dashboard.component';
import { BranchComponent } from './branch/branch.component';
import { CreatebranchComponent } from './branch/createbranch/createbranch.component';
import { UpdatebranchComponent } from './branch/updatebranch/updatebranch.component';
import { GradeComponent } from './grade/grade.component';
import { CreategradeComponent } from './grade/creategrade/creategrade.component';
import { UpdategradeComponent } from './grade/updategrade/updategrade.component';
import { SectionComponent } from './section/section.component';
import { CreatesectionComponent } from './section/createsection/createsection.component';
import { UpdatesectionComponent } from './section/updatesection/updatesection.component';
import { ShiftComponent } from './shift/shift.component';
import { ReportComponent } from './report/report.component';
import { UpdatebranchResolveService } from './branch/updatebranch/updatebranch.resolve.service';
import { OrganizationadminComponent } from './organizationadmin/organizationadmin.component';
import { CreateshiftComponent } from './shift/createshift/createshift.component';
import { PaymentComponent } from './payment/payment.component';
import { ClassesComponent } from './classes/classes.component';
import { TestComponent } from './test/test.component';
 

const routes: Routes = [
  {
    path : '', component: OrganizationadminComponent, children : [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'createbranch', component: CreatebranchComponent },
      { path: 'updatebranch/:branchId', component: UpdatebranchComponent, resolve : { branchDetails : UpdatebranchResolveService} },
      { path: 'grade', component: GradeComponent },
      { path: 'creategrade', component: CreategradeComponent },
      { path: 'updategrade', component: UpdategradeComponent },
      { path: 'section', component: SectionComponent },
      { path: 'createsection', component: CreatesectionComponent },
      { path: 'updatesection', component: UpdatesectionComponent },
      { path: 'shift', component: ShiftComponent },
      { path: 'createShift', component: CreateshiftComponent },
      { path: 'updateShift', component: CreateshiftComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'report', component: ReportComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'tree', component: TestComponent },
      { path : '', redirectTo: 'dashboard', pathMatch :'full' },
      { path: '**', redirectTo: 'dashboard' }
    ]
  } 
]; 


@NgModule({
  declarations: [ 
    OrganizationadminComponent,
    DashboardComponent, 
    BranchComponent, 
    CreatebranchComponent,
    UpdatebranchComponent,
    GradeComponent, 
    CreategradeComponent,
    UpdategradeComponent,
    SectionComponent, 
    CreatesectionComponent,
    UpdatesectionComponent,
    ShiftComponent, 
    CreateshiftComponent,
    ReportComponent,
    PaymentComponent,
    ClassesComponent,
    TestComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TreeViewModule
  ]
})
export class OrganizationadminModule { }
