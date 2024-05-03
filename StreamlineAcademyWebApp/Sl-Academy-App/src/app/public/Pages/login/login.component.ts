import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Login } from '../../../Models/Common/login';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../Enums/userrole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router:Router
  ) {}
  loginModel: Login = new Login();
  loadSpinner = false;
  onLogIn() {
    this.loadSpinner=true;
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          localStorage.setItem("streamlineToken", JSON.stringify(response.result.token));
        } 
        else {
          this.sharedService.showErrorToast(response.message);
        }
        switch(response.result.userRole){
          case UserRole.SuperAdmin:
            this.router.navigate(['/admin/dashboard']);
            break;
          case UserRole.AcademyAdmin:
            this.router.navigate(['/academy/dashboard']);
            break;
          case UserRole.Instructor:
            this.router.navigate(['/instructor/dashboard']);
            break;
          case UserRole.Student:
            this.router.navigate(['/student/dashboard']);
            break;
          default:
            break;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message);
          this.sharedService.showErrorToast(err.message);
        }
      },
    });
  }
}
