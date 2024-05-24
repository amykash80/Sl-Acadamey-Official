import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import { Enquiry, EnquiryResponse } from '../../../Models/Common/enquiry';
import { SharedService } from '../../../Services/shared.service';
import { RegistrationStatus } from '../../../Enums/RegistrationStatus';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrl: './enquirylist.component.css',
})
export class EnquirylistComponent {
  constructor(
    private enquiryService: EnquiryService,
    private sharedService: SharedService
  ) {}
  enquirylist: EnquiryResponse[] = [];
  filteredEnquiryList: EnquiryResponse[] = [];
  searchText: string = '';
  pending: boolean = true;
  registrationStatus = RegistrationStatus;
  ngOnInit() {
    this.loadAllEnquiries();
  }
  loadAllEnquiries() {
    this.enquiryService.enquiryList().subscribe({
      next: (response) => {
        this.enquirylist = response.result;
        this.filteredEnquiryList = this.enquirylist;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getStatusClass(status: RegistrationStatus): string {
    switch(status) {
      case RegistrationStatus.Rejected:
        return 'chip chip-danger';
      case RegistrationStatus.Approved:
        return 'chip chip-success';
      case RegistrationStatus.Pending:
        return 'chip chip-warning';
      default:
        return 'chip'; 
    }
  }
  filterEnquiries(): void {
    if (!this.searchText.trim()) {
      this.filteredEnquiryList = this.enquirylist.slice();
      return;
    }

    const searchTerm = this.searchText.toLowerCase();
    this.filteredEnquiryList = this.enquirylist.filter(
      (enquiry) =>
        enquiry.name!.toLowerCase().startsWith(searchTerm) ||
        enquiry.email!.toLowerCase().startsWith(searchTerm) ||
        enquiry.phoneNumber!.toLowerCase().startsWith(searchTerm)
    );
  }

  deleteEnquiry(enquiryId: any) {
    console.log(enquiryId);

    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Enquiry ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.enquiryService.deleteEnquiry(enquiryId).subscribe({
            next: (response) => {
              console.log(response);

              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllEnquiries();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
  rejectEnquiry(enquiryId: any) {

    this.sharedService
      .fireConfirmSwal('Are You sure you want to reject this Enquiry ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.enquiryService.rejectEnquiry(enquiryId).subscribe({
            next: (response) => {
              console.log(response);

              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllEnquiries();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }

}
