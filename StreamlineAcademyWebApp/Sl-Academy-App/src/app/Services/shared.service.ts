import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import Swal from 'sweetalert2';
import { AcademyService } from './academy.service';
import { AuthService } from './auth.service';
import { EnquiryService } from './enquiry.service';
import { AcademyResponse } from '../Models/Academy/Academy';
import { EnquiryResponse } from '../Models/Common/enquiry';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  toast = inject(HotToastService);
  router = inject(Router);
  academyService=inject(AcademyService);
  enquiryService=inject(EnquiryService);
  academyList:AcademyResponse[]=[];
  enquiryList:EnquiryResponse[]=[];

  getToken(): string {
    return localStorage.getItem('streamlineToken')
      ? JSON.parse(localStorage['streamlineToken'])
      : '';
  }
  getAllAcademies():AcademyResponse[]{
    this.academyService.academyList().subscribe((response) => {
      this.academyList=response.result;
    });
    return this.academyList

  }
  getAllEnquiries():EnquiryResponse[]{
    this.enquiryService.enquiryList().subscribe((response) => {
      this.enquiryList=response.result;
    });
    return this.enquiryList

  }
  showSuccessToast(message: string) {
    this.toast.success(message);
  }
  showErrorToast(message: string) {
    this.toast.error(message);
  }
  fireConfirmSwal(message: string) {
    return Swal.fire({
      title: message,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      customClass: {
        popup: 'small-swal', // Define a custom class for the modal
      },
      didOpen: () => {
        const modal = Swal.getPopup();
        modal!.style.maxWidth = '400px'; // Adjust the max-width to make the modal smaller
      },
    });
  }

  showLoader() {
    this.toast.loading('Logging IN');
  }
  logOutUser() {
    this.fireConfirmSwal('Are You sure you want to Logout ').then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }
}
