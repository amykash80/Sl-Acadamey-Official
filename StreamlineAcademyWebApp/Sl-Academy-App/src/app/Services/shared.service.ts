import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  toast = inject(HotToastService);
  router = inject(Router);

  getToken(): string {
    return localStorage.getItem('streamlineToken')
      ? JSON.parse(localStorage['streamlineToken'])
      : '';
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
        localStorage.removeItem('streamlineToken');
        localStorage.removeItem('userId')
        this.router.navigate(['login']);
      }
    });
  }
}
