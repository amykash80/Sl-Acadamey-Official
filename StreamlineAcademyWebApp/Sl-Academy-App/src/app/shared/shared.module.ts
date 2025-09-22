import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';
import { SpinnerComponent } from './Pages/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component'
import { FooterComponent } from './Components/footer/footer.component';
import { NoContentComponent } from './Pages/no-content/no-content.component';
import { RegisterStudentComponent } from './Pages/register-student/register-student.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'

@NgModule({
  declarations: [
    ChangepasswordComponent,
    SpinnerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    NotFoundComponent,
    FooterComponent,
    NoContentComponent,
    RegisterStudentComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

    FormsModule,
  ],
  exports:[
    ChangepasswordComponent,
    SpinnerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    FooterComponent,
    NoContentComponent,
  ]
})
export class SharedModule { }
