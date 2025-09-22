import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Pages/home/home.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FotterComponent } from './components/fotter/fotter.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GoogleOAuthComponent } from './Pages/google-oauth/google-oauth.component';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    EnquiryComponent,
    LoginComponent,
    NavbarComponent,
    FotterComponent,
    AboutUsComponent,
    GoogleOAuthComponent,
    
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class PublicModule { }
