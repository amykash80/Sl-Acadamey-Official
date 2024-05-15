import { Component } from '@angular/core';
import { Enquiry } from '../../../Models/Common/enquiry';
import { AuthService } from '../../../Services/auth.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {
  constructor(private authService: AuthService,
              private sharedService:SharedService
  ) { }
  enquiryModel: Enquiry = new Enquiry()

  sendEnquiry() {
    this.authService.enquiry(this.enquiryModel).subscribe({
      next: (response) => {
        console.log(response)
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message)
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message)
        }
      }
    })
  }
}
