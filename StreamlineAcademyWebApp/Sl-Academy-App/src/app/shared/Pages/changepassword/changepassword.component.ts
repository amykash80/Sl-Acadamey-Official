import { Component } from '@angular/core';
import { ChangePassword } from '../../../Models/Common/ChangePassword';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
constructor(private authService:AuthService){}
changePasswordModel:ChangePassword=new ChangePassword();
changePassword(){
this.authService.changePassword(this.changePasswordModel).subscribe({
  next:(response)=>{
    console.log(response)
  },
  error:(err)=>{
    console.log(err)
  }
})
}
}
