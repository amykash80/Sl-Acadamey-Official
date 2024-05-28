import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EnquirylistComponent } from './pages/enquirylist/enquirylist.component';
import { UpdateEnquiryComponent } from './pages/update-enquiry/update-enquiry.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChangepasswordComponent } from '../shared/Pages/changepassword/changepassword.component';
import { AcademyListComponent } from './pages/academy-list/academy-list.component';
import { RegisterAcademyComponent } from './pages/register-academy/register-academy.component';
import { UpdateAcademyyComponent } from './pages/update-academyy/update-academyy.component';
import { CreateAcademyTypeComponent } from './pages/create-academy-type/create-academy-type.component';
import { AcademyTypeListComponent } from './pages/academy-type-list/academy-type-list.component';
import { ProfileComponent } from '../shared/Pages/profile/profile.component';
import { RegisterEnquiryComponent } from './pages/register-enquiry/register-enquiry.component';

const routes: Routes = [
  {path:"",component:AdminComponent,
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
    {path:"enquirylist",component:EnquirylistComponent},
    {path:"updateenquiry/:id",component:UpdateEnquiryComponent},
    {path:"change-Password",component:ChangepasswordComponent},
    {path:"academylist",component:AcademyListComponent},
    {path:"register-academy",component:RegisterAcademyComponent},
    {path:"update-academy/:id",component:UpdateAcademyyComponent},
    {path:"create-academyType",component:CreateAcademyTypeComponent},
    {path:"academy-type-list",component:AcademyTypeListComponent},
    {path:"profile",component:ProfileComponent},
    {path:"register-enquiry/:id",component:RegisterEnquiryComponent},
    {path:"change-password",component:ChangepasswordComponent}


  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
