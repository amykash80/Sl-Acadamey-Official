import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EnquirylistComponent } from './pages/enquirylist/enquirylist.component';
import { UpdateEnquiryComponent } from './pages/update-enquiry/update-enquiry.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChangepasswordComponent } from '../shared/Pages/changepassword/changepassword.component';
import { authGuard } from '../shared/auth.guard';

const routes: Routes = [
  {path:"",component:AdminComponent,
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent,canActivate:[authGuard]},
    {path:"enquirylist",component:EnquirylistComponent,canActivate:[authGuard]},
    {path:"updateenquiry",component:UpdateEnquiryComponent,canActivate:[authGuard]},
    {path:"changePassword",component:ChangepasswordComponent,canActivate:[authGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
