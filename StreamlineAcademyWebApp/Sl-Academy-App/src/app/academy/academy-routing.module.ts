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
    {path:"update-course-content/:id/:courseId",component:UpdateCourseContentComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
