import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateCourseComponent } from './pages/createcourse/createcourse.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { UpdateCourseComponent } from './pages/update-course/update-course.component';

@NgModule({
  declarations: [
    AcademyComponent,
    DashboardComponent,
    CreateCourseComponent,
    CourseListComponent,
    UpdateCourseComponent,
    
    
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule
  ]
})
export class AcademyModule { }
