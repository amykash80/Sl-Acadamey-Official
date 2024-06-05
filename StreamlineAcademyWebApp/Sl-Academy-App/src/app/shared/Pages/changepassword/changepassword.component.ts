import { Component } from '@angular/core';
import { ChangePassword } from '../../../Models/Common/ChangePassword';
import { AuthService } from '../../../Services/auth.service';
import { SharedService } from '../../../Services/shared.service';
import { UserRole } from '../../../Enums/userrole';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(val=>{
      this.userRole=val['userRole']
      console.log(this.userRole)
    })
  }
  changePasswordModel: ChangePassword = new ChangePassword();
  loadSpinner=false;
  userRole!:UserRole
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
       
        if(this.userRole==UserRole.SuperAdmin){
          this.router.navigate(['/admin/dashboard']);
        }
        else if (this.userRole==UserRole.AcademyAdmin){
          this.router.navigate(['/academy/dashboard']);

        }
        else if (this.userRole==UserRole.Instructor){
          this.router.navigate(['/instructor/dashboard']);

        }
        else if (this.userRole==UserRole.Student){
          this.router.navigate(['/student/dashboard']);

        }
        else{
          this.router.navigate(['/login']);
          ;
        }

      },
      error: (err) => {
        console.log(err);
        this.loadSpinner=false;

      },
    });
  }
}
