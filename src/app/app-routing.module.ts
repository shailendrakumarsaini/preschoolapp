import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'organization', loadChildren: () => import('./organizationadmin/organizationadmin.module').then(m => m.OrganizationadminModule) },
  { path: 'branch', loadChildren: () => import('./branchadmin/branchadmin.module').then(m => m.BranchadminModule) },
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: '**', redirectTo:'login'}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
