import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../Services/auth.service';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    EnquiryComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
