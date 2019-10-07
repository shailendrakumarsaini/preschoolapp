import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


const routes: Routes = [
    { path : '', redirectTo:'login', pathMatch : 'full'},
    { path : '', children : [
        { path: 'login', component: LoginComponent },
        { path: 'forgotpassword', component: ForgotpasswordComponent },
        { path: '**', redirectTo: 'login' }
     ]
    }
];


@NgModule({
    declarations:[
        LoginComponent,
        ForgotpasswordComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
})

export class LoginModule {

}