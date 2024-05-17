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
import { UpdateCorseResourceComponent } from './pages/update-corse-resource/update-corse-resource.component';


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
    
    
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    FormsModule,
  ]
})
export class AcademyModule { }
