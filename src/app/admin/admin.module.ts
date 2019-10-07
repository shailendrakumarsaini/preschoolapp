import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { PublisherComponent } from './publisher/publisher.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CouponComponent } from './coupon/coupon.component';
import { CreatecouponComponent } from './coupon/createcoupon/createcoupon.component';
import { CreateorganizationComponent } from './organizations/createorganization/createorganization.component';
import { CreatepublisherComponent } from './publisher/createpublisher/createpublisher.component';


const routes: Routes = [
  {
    path : '', component: AdminComponent, children : [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'organization', component: OrganizationsComponent },
      { path: 'createorg/:id', component: CreateorganizationComponent },
      { path: 'createpublisher/:id', component: CreatepublisherComponent },
      { path: 'publisher', component: PublisherComponent },
      { path: 'curriculum', component: CurriculumComponent },
      { path: 'coupon', component: CouponComponent },
      { path: 'createcoupon', component: CreatecouponComponent },
      { path: 'updatecoupon', component: CreatecouponComponent },
      { path : '', redirectTo: 'organization', pathMatch :'full' },
      { path : '**', redirectTo: 'dashboard' }
    ]
  }  
];


@NgModule({
  declarations: [ 
    AdminComponent,
    DashboardComponent, 
    OrganizationsComponent, 
    CreateorganizationComponent,
    PublisherComponent, 
    CreatepublisherComponent,
    CurriculumComponent, 
    CouponComponent, 
    CreatecouponComponent  
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot()
  ]
})
export class AdminModule { }
 