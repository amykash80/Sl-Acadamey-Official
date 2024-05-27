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
  loadSpinner=false;
  changeMyPassword() {
    this.loadSpinner=true;
    this.authService.changePassword(this.changePasswordModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.result);
          this.loadSpinner=false;
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner=false;

        }
      },
      error: (err) => {
        console.log(err);
        this.loadSpinner=false;

      },
    });
  }
}
