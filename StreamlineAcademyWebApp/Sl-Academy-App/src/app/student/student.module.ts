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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckMyCoursesComponent } from './Pages/check-my-courses/check-my-courses.component';
import { CourseResourceComponent } from './Pages/course-resource/course-resource.component';


@NgModule({
  declarations: [
    StudentComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SidebarComponent,
    MyBatchesComponent,
    MySchedulesComponent,
    CheckMyCoursesComponent,
    CourseResourceComponent

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class StudentModule { }
