import { Component, inject } from '@angular/core';
import { ForgotPasswordModel } from '../../../Models/Common/ForgotPassword';
import { AuthService } from '../../../Services/auth.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgotPasswordModel: ForgotPasswordModel = new ForgotPasswordModel();
  authService = inject(AuthService);
  sharedService = inject(SharedService);
  router = inject(Router);
  loadspinner = false;
  showForm = true;

  forgotPassword() {
    this.loadspinner = true;
    this.authService.forgotPassword(this.forgotPasswordModel).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.sharedService.showSuccessToast(res.result);
          this.loadspinner = false;
          this.showForm=false;
        } else {
          this.sharedService.showErrorToast(res.message);
          this.loadspinner = false;
          this.showForm=true;
        }
      },
    });
  }
}
