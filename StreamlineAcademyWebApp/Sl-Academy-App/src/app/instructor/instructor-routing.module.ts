import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { CheckMycoursesComponent } from './pages/check-mycourses/check-mycourses.component';
import { CheckMyBatchComponent } from './pages/check-my-batch/check-my-batch.component';
import { ProfileComponent } from '../shared/Pages/profile/profile.component';
import { CheckMyStudentListComponent } from './Pages/check-my-student-list/check-my-student-list.component';
import { AttendenceComponent } from '../student/Pages/attendence/attendence.component';

const routes: Routes = [
  {path:"",component:InstructorComponent,canActivate:[AuthGuard],
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
    {path:"check-mycourses",component:CheckMycoursesComponent},
    {path:"check-my-batch",component:CheckMyBatchComponent},
    {path:"profile",component:ProfileComponent},
    {path:"student-list",component:CheckMyStudentListComponent},
    {path:"attendence",component:AttendenceComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
