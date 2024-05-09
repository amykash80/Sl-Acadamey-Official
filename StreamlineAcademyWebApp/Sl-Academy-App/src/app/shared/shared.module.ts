import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';
import { SpinnerComponent } from './Pages/spinner/spinner.component';
import { ProfileComponent } from './Pages/profile/profile.component';



@NgModule({
  declarations: [
    ChangepasswordComponent,
    SpinnerComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    ChangepasswordComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
