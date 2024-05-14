import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';
import { SpinnerComponent } from './Pages/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ProfileComponent } from './Pages/profile/profile.component';


@NgModule({
  declarations: [
    ChangepasswordComponent,
    SpinnerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports:[
    ChangepasswordComponent,
    SpinnerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class SharedModule { }
