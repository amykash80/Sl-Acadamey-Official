import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    StudentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
