import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Pages/home/home.component';
import { EnquiryComponent } from './Pages/enquiry/enquiry.component';
import { LoginComponent } from './Pages/login/login.component';
import { ForgotPasswordComponent } from '../shared/Pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../shared/Pages/reset-password/reset-password.component';
import { ChangepasswordComponent } from '../shared/Pages/changepassword/changepassword.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GoogleOAuthComponent } from './Pages/google-oauth/google-oauth.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'login', component: LoginComponent },
      { path: 'google-auth', component: GoogleOAuthComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'change-password/:userRole', component: ChangepasswordComponent },
      {path:"about-us",component:AboutUsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
