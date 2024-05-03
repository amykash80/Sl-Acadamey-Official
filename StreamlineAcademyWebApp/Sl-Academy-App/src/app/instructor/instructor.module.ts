import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    InstructorComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
