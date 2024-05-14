import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateCourseComponent } from './pages/createcourse/createcourse.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { UpdateCourseComponent } from './pages/update-course/update-course.component';
import { CreateCourseContentComponent } from './pages/create-course-content/create-course-content.component';
import { CourseContentListComponent } from './pages/course-content-list/course-content-list.component';




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
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
