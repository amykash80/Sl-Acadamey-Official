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
import { CreateCourseResourceComponent } from './pages/create-course-resource/create-course-resource.component';
import { CourseResourceListComponent } from './pages/course-resource-list/course-resource-list.component';
import { CreateBatchComponent } from './Pages/create-batch/create-batch.component';
import { AddLocationComponent } from './Pages/add-location/add-location.component';
import { LocationListComponent } from './Pages/location-list/location-list.component';
import { LocationMapComponent } from './pages/location-map/location-map.component';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HeaderComponent } from './Components/header/header.component';
import { BatchListComponent } from './Pages/batch-list/batch-list.component';
import { CreateInstructorComponent } from './pages/create-instructor/create-instructor.component';
import { InstructorListComponent } from './pages/instructor-list/instructor-list.component';
import { UpdateCorseResourceComponent } from './pages/update-corse-resource/update-corse-resource.component';
import { UpdateInstructorComponent } from './pages/update-instructor/update-instructor.component';
import { UpdateBatchComponent } from './Pages/update-batch/update-batch.component';
import { SharedModule } from '../shared/shared.module';
import { AddCourseCategoryComponent } from './Pages/add-course-category/add-course-category.component';
import { CourseCategoryListComponent } from './Pages/course-category-list/course-category-list.component';
import { AddBatchScheduleComponent } from './pages/add-batch-schedule/add-batch-schedule.component';
import { BatchScheduleListComponent } from './pages/batch-schedule-list/batch-schedule-list.component';
import { UpdateBatchScheduleComponent } from './pages/update-batch-schedule/update-batch-schedule.component';


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
    CreateCourseResourceComponent,
    CourseResourceListComponent,
    CreateBatchComponent,
    AddLocationComponent,
    LocationListComponent,
    LocationMapComponent,
    UpdateLocationComponent,
    UpdateCorseResourceComponent,
    CreateInstructorComponent,
    InstructorListComponent,
    SidebarComponent,
    HeaderComponent,
    BatchListComponent,
    CreateInstructorComponent,
    InstructorListComponent,
    UpdateCorseResourceComponent,
    UpdateInstructorComponent,
    UpdateBatchComponent,
    AddCourseCategoryComponent,
    CourseCategoryListComponent,
    AddBatchScheduleComponent,
    BatchScheduleListComponent,
    UpdateBatchScheduleComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    FormsModule,
    SharedModule
  
  ]
})
export class AcademyModule { }
