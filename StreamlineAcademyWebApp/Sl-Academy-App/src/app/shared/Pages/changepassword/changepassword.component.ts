import { Component } from '@angular/core';
import { ChangePassword } from '../../../Models/Common/ChangePassword';
import { AuthService } from '../../../Services/auth.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}
  changePasswordModel: ChangePassword = new ChangePassword();
  changeMyPassword() {
    this.authService.changePassword(this.changePasswordModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.result);
        } else {
          this.sharedService.showErrorToast(response.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
