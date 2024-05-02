import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EnquirylistComponent } from './pages/enquirylist/enquirylist.component';
import { UpdateEnquiryComponent } from './pages/update-enquiry/update-enquiry.component';

const routes: Routes = [
  {path:"",component:AdminComponent,
  children:[
    {path:"enquirylist",component:EnquirylistComponent},
    {path:"updateenquiry",component:UpdateEnquiryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
