import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import { Enquiry, EnquiryResponse, EnquiryUpdate } from '../../../Models/Common/enquiry';
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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  showSpinner=true;
  showTable=false
  ngOnInit() {
    this.loadAllEnquiries();
  }
  loadAllEnquiries() {
    this.enquiryService.enquiryList().subscribe({
      next: (response) => {
        this.showSpinner=false;
        this.showTable=true
        this.enquirylist = response.result;
        this.filteredEnquiryList = this.enquirylist;
        this.totalItems = this.filteredEnquiryList.length;
        this.currentPage = 1; 
        this.updatePagination();
       
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
  filterEnquiries(event: any): void {
    if (!this.searchText.trim()) {
      this.filteredEnquiryList = [...this.enquirylist];
    } else {
      const enteredValue=event!.target!.value;
    console.log(enteredValue);
    this.filteredEnquiryList = this.enquirylist.filter(enquiry => 
      enquiry.name?.toLowerCase().startsWith(enteredValue) 
      || enquiry.phoneNumber?.toLowerCase().startsWith(enteredValue)
      || enquiry.email?.toLowerCase().startsWith(enteredValue)
    );
    }
    this.totalItems = this.filteredEnquiryList.length;
    this.currentPage = 1;
    this.updatePagination();
    
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.filteredEnquiryList = this.enquirylist.slice(startIndex, endIndex);
    this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
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
  rejectEnquiry(enquiry:EnquiryUpdate) {

    this.sharedService
      .fireConfirmSwal('Are You sure you want to reject this Enquiry ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.enquiryService.rejectEnquiry(enquiry).subscribe({
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
