import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateCourseComponent } from './Pages/createcourse/createcourse.component';
import { CourseListComponent } from './Pages/course-list/course-list.component';
import { UpdateCourseComponent } from './Pages/update-course/update-course.component';
import { CreateCourseContentComponent } from './Pages/create-course-content/create-course-content.component';
import { CourseContentListComponent } from './Pages/course-content-list/course-content-list.component';
import { UpdateCourseContentComponent } from './Pages/update-course-content/update-course-content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcademyComponent,
    DashboardComponent,
    CreateCourseComponent,
    CourseListComponent,
    UpdateCourseComponent,
    CreateCourseContentComponent,
    CourseContentListComponent,
    UpdateCourseContentComponent,
    
    
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    FormsModule,
  ]
})
export class AcademyModule { }
