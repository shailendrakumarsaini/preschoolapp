import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

import { HeaderComponent } from './layout/header/header.component';
import { SidepanelComponent } from './layout/sidepanel/sidepanel.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent, 
    SidepanelComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({ closeButton :true }),
    NgxLoadingModule.forRoot({}),
    DataTablesModule
  ],
  exports : [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    NgxLoadingModule,
    RouterModule,
    DataTablesModule,
    HeaderComponent, 
    SidepanelComponent, 
    FooterComponent
  ]
})
export class SharedModule { }
