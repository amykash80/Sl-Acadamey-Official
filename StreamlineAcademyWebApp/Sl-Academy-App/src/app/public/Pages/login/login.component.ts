import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Login } from '../../../Models/Common/login';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from '../../../Enums/userrole';
import { ChangePassword } from '../../../Models/Common/ChangePassword';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  userRole?: UserRole;
  loginModel: Login = new Login();
  loadSpinner = false;
  showLoginForm = true;
  passwordVisible = false;
  chnagePasswordModel: ChangePassword = new ChangePassword();
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onLogIn() {
    this.loadSpinner = true;
    this.authService.login(this.loginModel).subscribe({
      next: async (response) => {
        if (response.isSuccess) {
          this.userRole = response.result.userRole;
          localStorage.setItem(
            'streamlineToken',
            JSON.stringify(response.result.token)
          );
          localStorage.setItem('responseObj', JSON.stringify(response.result));

          if (response.result.isPasswordTemporary) {
            this.showLoginForm = false;
            this.sharedService.showErrorToast(
              'please chnage your temporary password'
            );
            const { value: formValues } = await Swal.fire({
              title: 'Change Password',
              html: `
            <form id="changePasswordForm" #changePasswordForm="ngForm" method="POST" class="register-form ajax-contact">
              <h5 class="form-title">Change Password</h5>
              <div class="form-group style-3">
                <label>Old Password *</label>
                <input id="oldPassword" type="password" class="form-control style-white" name="oldPassword" placeholder="" required />
                <div class="error-message" style="display: none;">Old password is required</div>
              </div>
              <div class="form-group style-3">
                <label>New Password *</label>
                <input id="newPassword" type="password" class="form-control style-white" name="newPassword" placeholder="" required />
                <div class="error-message" style="display: none;">New password is required</div>
              </div>
              <div class="form-group style-3">
                <label>Confirm Password *</label>
                <input id="confirmPassword" type="password" class="form-control style-white" name="confirmPassword" placeholder="" required />
                <div class="error-message" style="display: none;">Confirm password is required</div>
              </div>
            </form>`,
              focusConfirm: false,
              preConfirm: () => {
                const oldPassword = (
                  document.getElementById('oldPassword') as HTMLInputElement
                ).value;
                const newPassword = (
                  document.getElementById('newPassword') as HTMLInputElement
                ).value;
                const confirmPassword = (
                  document.getElementById('confirmPassword') as HTMLInputElement
                ).value;

                let valid = true;
                if (!oldPassword) {
                  (
                    document.querySelector(
                      '#oldPassword + .error-message'
                    ) as HTMLElement
                  ).style.display = 'block';
                  valid = false;
                }
                if (!newPassword) {
                  (
                    document.querySelector(
                      '#newPassword + .error-message'
                    ) as HTMLElement
                  ).style.display = 'block';
                  valid = false;
                }
                if (!confirmPassword) {
                  (
                    document.querySelector(
                      '#confirmPassword + .error-message'
                    ) as HTMLElement
                  ).style.display = 'block';
                  valid = false;
                }
                if (
                  newPassword &&
                  confirmPassword &&
                  newPassword !== confirmPassword
                ) {
                  Swal.showValidationMessage(
                    'New password and confirm password do not match'
                  );
                  valid = false;
                }

                if (valid) {
                  return { oldPassword, newPassword, confirmPassword };
                }
                return false;
              },
            });

            if (formValues) {
              this.chnagePasswordModel.oldPassword = formValues.oldPassword;
              this.chnagePasswordModel.newPassword = formValues.newPassword;
              this.chnagePasswordModel.confirmPassword =
                formValues.confirmPassword;
              this.changeMyPassword();
            }

            // this.router.navigate(['change-password',response.result.userRole]);
          } else {
            switch (response.result.userRole) {
              case UserRole.SuperAdmin:
                this.router.navigate(['/admin/dashboard']);
                this.sharedService.showSuccessToast(
                  `welcome ${response.result.fullName}`
                );
                break;
              case UserRole.AcademyAdmin:
                this.router.navigate(['/academy/dashboard']);
                this.sharedService.showSuccessToast(
                  `welcome ${response.result.fullName}`
                );

                break;
              case UserRole.Instructor:
                this.router.navigate(['/instructor/dashboard']);
                this.sharedService.showSuccessToast(
                  `welcome ${response.result.fullName}`
                );

                break;
              case UserRole.Student:
                this.router.navigate(['/student/dashboard']);
                this.sharedService.showSuccessToast(
                  `welcome ${response.result.fullName}`
                );

                break;
              default:
                break;
            }
          }
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.InternalServerError) {
          console.log(err.message);
          this.sharedService.showErrorToast(err.message);
          this.loadSpinner = false;
        }
      },
    });
  }
  changeMyPassword() {
    console.log(this.chnagePasswordModel);
    this.authService.changePassword(this.chnagePasswordModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.result);
          this.loadSpinner = false;
          if (this.userRole == UserRole.SuperAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else if (this.userRole == UserRole.AcademyAdmin) {
            this.router.navigate(['/academy/dashboard']);
          } else if (this.userRole == UserRole.Instructor) {
            this.router.navigate(['/instructor/dashboard']);
          } else if (this.userRole == UserRole.Student) {
            this.router.navigate(['/student/dashboard']);
          } else {
            return;
          }
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
          this.showLoginForm = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.loadSpinner = false;
      },
    });
  }
}
