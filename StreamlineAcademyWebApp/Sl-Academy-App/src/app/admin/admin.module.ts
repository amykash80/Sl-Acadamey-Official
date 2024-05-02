import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EnquirylistComponent } from './pages/enquirylist/enquirylist.component';
import { UpdateEnquiryComponent } from './pages/update-enquiry/update-enquiry.component';


@NgModule({
  declarations: [
    AdminComponent,
    EnquirylistComponent,
    UpdateEnquiryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
