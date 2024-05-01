import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Pages/home/home.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {path:"",component:PublicComponent,
    children:[
      {path:"",redirectTo:"/home",pathMatch:"full"},
      {path:"home",component:HomeComponent},
      {path:"enquiry",component:EnquiryComponent},
      {path:"login",component:LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
