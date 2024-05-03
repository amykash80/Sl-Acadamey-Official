import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AcademyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule
  ]
})
export class AcademyModule { }
