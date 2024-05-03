import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Login } from '../../../Models/Common/login';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService,
              private sharedService:SharedService
  ) { }
  loginModel: Login = new Login();
  loggedIn() {
    // this.loginModel.email="r@example.com"
    // this.loginModel.password="r@1234"
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
        }
        else {
          this.sharedService.showErrorToast(response.message)
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message)
          this.sharedService.showErrorToast(err.message)
        }
      }
    })
  }
}
