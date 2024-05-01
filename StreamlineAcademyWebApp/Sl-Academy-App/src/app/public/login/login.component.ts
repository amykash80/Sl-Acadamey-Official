import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Login } from '../../Models/Common/login';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private authService:AuthService){}
 loginModel:Login=new Login();
 loggedIn(){
  this.authService.login(this.loginModel).subscribe({
    next:(response)=>{
      console.log(response)
    },
    error:(err:HttpErrorResponse)=>{
    }
  })
 }
}
