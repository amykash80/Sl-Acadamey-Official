import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../../Services/oauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../enviroments/enviroment';
import { UserRole } from '../../../Enums/userrole';
import Swal from 'sweetalert2';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-google-oauth',
  templateUrl: './google-oauth.component.html',
  styleUrl: './google-oauth.component.css',
})
export class GoogleOAuthComponent implements OnInit {
  constructor(
    private OAuthService: OauthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}
  userRole: any;
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot;
    const code = params.queryParams['code'];

    this.OAuthService.generateAccessToken({
      clientId: environment.googleOAuthClientId,
      code: code,
      redirect_uri: environment.redirectUrl,
    }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.userRole = response.result.userRole;
          localStorage.setItem(
            'streamlineToken',
            JSON.stringify(response.result.token)
          );
          localStorage.setItem('responseObj', JSON.stringify(response.result));
          this.redirectToDashoboard(this.userRole);
        }else{
          this.sharedService.showErrorToast('Something went wrong, please try again!');
        }
      },
      error: (error)=>{
          this.sharedService.showErrorToast('Something went wrong, please try again!');
          this.router.navigate(['/login']);
          console.error('Error Logging in', error);
      }
    });
  }
  redirectToDashoboard(role: Number) {
    switch (role) {
      case UserRole.SuperAdmin:
        this.router.navigate(['/admin/dashboard']);
        const ToasterShow = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        ToasterShow.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        this.sharedService.showSuccessToast(`welcome ${role}`);
        break;
      case UserRole.AcademyAdmin:
        this.router.navigate(['/academy/dashboard']);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        this.sharedService.showSuccessToast(`welcome ${role}`);

        break;
      case UserRole.Instructor:
        this.router.navigate(['/instructor/dashboard']);
        const Toaster = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toaster.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        this.sharedService.showSuccessToast(`welcome ${role}`);

        break;
      case UserRole.Student:
        this.router.navigate(['/student/dashboard']);
        const Toaster2 = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toaster2.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        this.sharedService.showSuccessToast(`welcome ${role}`);

        break;
      default:
        break;
    }
  }
}
