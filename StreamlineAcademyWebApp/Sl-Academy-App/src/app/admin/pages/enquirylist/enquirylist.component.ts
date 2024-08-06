import { ChangeDetectorRef, Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import {
  Enquiry,
  EnquiryResponse,
  EnquiryUpdate,
} from '../../../Models/Common/enquiry';
import { SharedService } from '../../../Services/shared.service';
import { RegistrationStatus } from '../../../Enums/RegistrationStatus';
import { Router } from '@angular/router';
import { EnquireAs } from '../../../Enums/EnquireAs';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrl: './enquirylist.component.css',
})
export class EnquirylistComponent {
  constructor(
    private enquiryService: EnquiryService,
    private sharedService: SharedService,
    private router: Router
  ) {}
  enquirylist: EnquiryResponse[] = [];
  filteredEnquiryList: EnquiryResponse[] = [];
  searchText: string = '';
  pending: boolean = true;
  registrationStatus = RegistrationStatus;
  enquire = EnquireAs;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  showSpinner = true;
  showTable = false;

  ngOnInit() {
    this.loadAllEnquiries();
  }
  loadAllEnquiries() {
    this.enquiryService.enquiryList().subscribe({
      next: (response) => {
        console.log(response);
        this.showSpinner = false;
        this.showTable = true;
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
    switch (status) {
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
    const filterValue = event.target.value.toLowerCase();
    console.log('Filter value:', filterValue);

    if (!filterValue) {
      console.log('Search box is empty, resetting the list.');
      this.filteredEnquiryList = [...this.enquirylist];
    } else {
      console.log('Filtering enquiries...');
      this.filteredEnquiryList = this.enquirylist.filter(
        (enquiry) =>
          enquiry.name?.toLowerCase().startsWith(filterValue) ||
          enquiry.email?.toLowerCase().startsWith(filterValue) ||
          enquiry.phoneNumber?.toLowerCase().startsWith(filterValue)
      );
    }

    console.log('Filtered Enquiry List:', this.filteredEnquiryList);
    this.totalItems = this.filteredEnquiryList.length;
    this.currentPage = 1;
    this.updatePagination(filterValue?false:true);
  }

  updatePagination(isSlice:boolean=true): void {
    console.log('inside enquiry list', this.totalItems);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    if(isSlice){
      this.filteredEnquiryList = this.enquirylist.slice(startIndex, endIndex);
    }
   
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
    this.sharedService.fireConfirmSwal('Are You sure').then((result: any) => {
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
  rejectEnquiry(enquiry: EnquiryUpdate) {
    this.sharedService
      .fireConfirmRejectSwal('Are You sure')
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
