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
import { CreateAcademyTypeComponent } from './pages/create-academy-type/create-academy-type.component';
import { AcademyTypeListComponent } from './pages/academy-type-list/academy-type-list.component';
import { FormsModule } from '@angular/forms';
import { UpdateAcademyyComponent } from './pages/update-academyy/update-academyy.component';
import { DashboardHeaderComponent } from './Components/dashboard-header/dashboard-header.component';
import { RegistrationStatusPipe } from '../Pipes/registration-status.pipe';
import { RegisterEnquiryComponent } from './pages/register-enquiry/register-enquiry.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    EnquirylistComponent,
    UpdateEnquiryComponent,
    DashboardComponent,
    AcademyListComponent,
    RegisterAcademyComponent,
    SidebarComponent,
    CreateAcademyTypeComponent,
    AcademyTypeListComponent,
    UpdateAcademyyComponent,
    DashboardHeaderComponent,
    RegistrationStatusPipe,
    RegisterEnquiryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
