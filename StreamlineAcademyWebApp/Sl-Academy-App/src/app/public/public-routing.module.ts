import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './Pages/home/home.component';
import { PublicComponent } from './public.component';
import { LoginComponent } from './Pages/login/login.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';

const routes: Routes = [
 {path:"",component:PublicComponent,
 children:[
 {path:"",redirectTo:"/home",pathMatch:"full"},
 {path:"home",component:HomeComponent},
 {path:"login",component:LoginComponent},
 {path:"enquiry",component:EnquiryComponent}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
