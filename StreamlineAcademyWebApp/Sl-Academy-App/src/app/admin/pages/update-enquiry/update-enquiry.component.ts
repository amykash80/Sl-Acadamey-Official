import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import {
  Enquiry,
  EnquiryResponse,
  EnquiryUpdate,
} from '../../../Models/Common/enquiry';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-enquiry',
  templateUrl: './update-enquiry.component.html',
  styleUrl: './update-enquiry.component.css',
})
export class UpdateEnquiryComponent {
  constructor(
    private enquiryService: EnquiryService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}
  enquiryModel: EnquiryResponse = new EnquiryResponse();
  enquiryId: string = '';
  ngOnInit() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.enquiryId = paramVal['id'];
      this.getEnquiryById();
    });
  }
  getEnquiryById() {
    this.enquiryService.getEnquiryById(this.enquiryId).subscribe({
      next: (response) => {
        this.enquiryModel = response.result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateEnquiry() {
    this.enquiryService.updateEnquiry(this.enquiryModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.router.navigate(['/admin/enquirylist']);
        } else {
          this.sharedService.showErrorToast(response.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
