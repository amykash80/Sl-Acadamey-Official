import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Pages/home/home.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthService } from '../Services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FotterComponent } from './components/fotter/fotter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    EnquiryComponent,
    LoginComponent,
    NavbarComponent,
    FotterComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule
  ]
})
export class PublicModule { }
