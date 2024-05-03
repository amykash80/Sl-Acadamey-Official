import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';


@NgModule({
  declarations: [
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
