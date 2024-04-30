import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
