import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { CheckMycoursesComponent } from './pages/check-mycourses/check-mycourses.component';
import { FormsModule } from '@angular/forms';
import { CheckMyBatchComponent } from './pages/check-my-batch/check-my-batch.component';
import { SharedModule } from '../shared/shared.module';
import { CheckMyStudentListComponent } from './Pages/check-my-student-list/check-my-student-list.component';
import { CheckMyScheduleComponent } from './Pages/check-my-schedule/check-my-schedule.component';


@NgModule({
  declarations: [
    InstructorComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CheckMycoursesComponent,
    CheckMyBatchComponent,
    CheckMyStudentListComponent,
    CheckMyScheduleComponent,
    
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
    SharedModule
    
  ]
})
export class InstructorModule { }
