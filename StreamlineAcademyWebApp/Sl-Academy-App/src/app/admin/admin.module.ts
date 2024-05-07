import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EnquirylistComponent } from './pages/enquirylist/enquirylist.component';
import { UpdateEnquiryComponent } from './pages/update-enquiry/update-enquiry.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AcademyListComponent } from './pages/academy-list/academy-list.component';
import { RegisterAcademyComponent } from './pages/register-academy/register-academy.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    EnquirylistComponent,
    UpdateEnquiryComponent,
    DashboardComponent,
    AcademyListComponent,
    RegisterAcademyComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
