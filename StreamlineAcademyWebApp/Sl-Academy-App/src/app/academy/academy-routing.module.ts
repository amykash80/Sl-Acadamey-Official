import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateCourseComponent } from './Pages/createcourse/createcourse.component';
import { CourseListComponent } from './Pages/course-list/course-list.component';
import { UpdateCourseComponent } from './Pages/update-course/update-course.component';
import { CreateCourseContentComponent } from './Pages/create-course-content/create-course-content.component';
import { CourseContentListComponent } from './Pages/course-content-list/course-content-list.component';
import { UpdateCourseContentComponent } from './Pages/update-course-content/update-course-content.component';
import { CreateBatchComponent } from './Pages/create-batch/create-batch.component';
import { AddLocationComponent } from './Pages/add-location/add-location.component';
import { LocationListComponent } from './Pages/location-list/location-list.component';
import { LocationMapComponent } from './pages/location-map/location-map.component';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';


const routes: Routes = [
  {path:"",component:AcademyComponent,
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
    {path:"create-course",component:CreateCourseComponent},
    {path:"course-list",component:CourseListComponent},
    {path:"update-course",component:UpdateCourseComponent},
    {path:"create-course-content/:id",component:CreateCourseContentComponent},
    {path:"course-content-list/:id",component:CourseContentListComponent},
    {path:"update-course-content/:id/:courseId",component:UpdateCourseContentComponent},
    {path:"create-batch/:courseId",component:CreateBatchComponent},
    {path:"add-location",component:AddLocationComponent},
    {path:"location-list",component:LocationListComponent},
    {path:"location-map/:latitude/:longitude",component:LocationMapComponent},
    {path:"update-location/:id",component:UpdateLocationComponent},
    {path:"update-course/:id",component:UpdateCourseComponent},
    {path:"delete-course/:id",component:UpdateCourseComponent},
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
