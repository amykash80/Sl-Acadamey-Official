import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './Components/dashboard-header/dashboard-header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MyBatchesComponent } from './Pages/my-batches/my-batches.component';
import { FormsModule } from '@angular/forms';
import { MySchedulesComponent } from './Pages/my-schedules/my-schedules.component';


@NgModule({
  declarations: [
    StudentComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SidebarComponent,
    MyBatchesComponent,
    MySchedulesComponent

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class StudentModule { }
