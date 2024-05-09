import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';
import { SpinnerComponent } from './Pages/spinner/spinner.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChangepasswordComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports:[
    ChangepasswordComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
