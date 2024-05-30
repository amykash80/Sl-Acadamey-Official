import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {path:"",component:InstructorComponent,canActivate:[AuthGuard],
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
