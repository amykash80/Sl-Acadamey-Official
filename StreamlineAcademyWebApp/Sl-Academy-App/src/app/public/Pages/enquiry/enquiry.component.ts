import { Component } from '@angular/core';
import { Enquiry } from '../../../Models/Common/enquiry';
import { AuthService } from '../../../Services/auth.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css',
})
export class EnquiryComponent {
  loadSpinner: boolean = false;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router:Router
  ) {}
  enquiryModel: Enquiry = new Enquiry();

  sendEnquiry() {
    this.loadSpinner = true;
    this.authService.enquiry(this.enquiryModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.loadSpinner = false;
          this.router.navigate(['/home'])
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          this.loadSpinner = false;
        }
      },
    });
  }
}
