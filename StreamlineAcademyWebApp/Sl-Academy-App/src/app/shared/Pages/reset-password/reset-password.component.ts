import { Component, inject } from '@angular/core';
import { ResetPasswordModel } from '../../../Models/Common/ResetPassword';
import { AuthService } from '../../../Services/auth.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  authService = inject(AuthService);
  sharedService = inject(SharedService);
  router = inject(Router);
  resetUserPassword() {
    this.resetPasswordModel.resetCode =
      this.resetPasswordModel.resetCode?.toString();
    this.authService.resetPassword(this.resetPasswordModel).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          this.sharedService.showSuccessToast(res.result);
          this.router.navigate(['/login']);
        } else {
          this.sharedService.showErrorToast(res.message);
        }
      },
    });
  }
}
