 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { ProfileComponent } from '../shared/Pages/profile/profile.component';
import { MyBatchesComponent } from './Pages/my-batches/my-batches.component';
import { MySchedulesComponent } from './Pages/my-schedules/my-schedules.component';
import { CheckMyCoursesComponent } from './Pages/check-my-courses/check-my-courses.component';
import { CourseResourceComponent } from './Pages/course-resource/course-resource.component';

const routes: Routes = [
  {path:"",component:StudentComponent,canActivate:[AuthGuard],
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
    {path:"profile",component:ProfileComponent},
    {path:"my-batches",component:MyBatchesComponent},
    {path:"my-schedules",component:MySchedulesComponent},
    {path:"check-my-courses",component:CheckMyCoursesComponent},
    {path:"course-resource/:id",component:CourseResourceComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
