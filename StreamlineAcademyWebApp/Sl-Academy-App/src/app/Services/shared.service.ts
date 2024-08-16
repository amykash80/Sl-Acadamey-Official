import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import Swal from 'sweetalert2';
import { AcademyService } from './academy.service';
import { AuthService } from './auth.service';
import { EnquiryService } from './enquiry.service';
import { AcademyResponse } from '../Models/Academy/Academy';
import { EnquiryResponse } from '../Models/Common/enquiry';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private profilePictureChangedSource = new Subject<string>();
  profilePictureChanged$ = this.profilePictureChangedSource.asObservable();
  mobileSidebarOpen = signal(false);

  toggleSidebar() {
    this.mobileSidebarOpen.update((v) => !v);
  }

  broadcastProfilePictureChange(filePath: string) {
    this.profilePictureChangedSource.next(filePath);
  }
  constructor() {}
  toast = inject(HotToastService);
  router = inject(Router);
  academyId: any;
  academyService = inject(AcademyService);
  enquiryService = inject(EnquiryService);
  academyList: AcademyResponse[] = [];
  enquiryList: EnquiryResponse[] = [];

  getToken(): string {
    return localStorage.getItem('streamlineToken')
      ? JSON.parse(localStorage['streamlineToken'])
      : '';
  }
  getAllAcademies(): AcademyResponse[] {
    this.academyService.academyList().subscribe((response) => {
      this.academyList = response.result;
    });
    return this.academyList;
  }
  getAllEnquiries(): EnquiryResponse[] {
    this.enquiryService.enquiryList().subscribe((response) => {
      this.enquiryList = response.result;
    });
    return this.enquiryList;
  }
  showSuccessToast(message: string) {
    this.toast.success(message);
  }
  showErrorToast(message: string) {
    this.toast.error(message);
  }
  NoDataSwal(message: string) {
    Swal.fire({
      text: message,
      heightAuto: false,
      width: '300px',
    });
  }
  fireConfirmSwal(message: string) {
    return Swal.fire({
      title: message,
      icon: 'error',
      text: 'Do you really want to delete this record? This process cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      customClass: {
        popup: 'small-swal',
      },
      didOpen: () => {
        const modal = Swal.getPopup();
        modal!.style.maxWidth = '500px'; 
      },
    });
  }
  fireConfirmRejectSwal(message: string) {
    return Swal.fire({
      title: message,
      icon: 'error',
      text: ' you want to reject this enquiry!.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      customClass: {
        popup: 'small-swal', 
      },
      didOpen: () => {
        const modal = Swal.getPopup();
        modal!.style.maxWidth = '500px'; 
      },
    });
  }
  updateConfirmSwal() {
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  showLoader() {
    this.toast.loading('Logging IN');
  }

  setAcademyId(id: string): void {
    this.academyId = id;
  }

  getAcademyId(): string | undefined {
    return this.academyId;
  }
  showDescriptorSwal(description: string) {
    Swal.fire({
      title: description,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }
  logOutUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['login']);
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
          title: 'logged out successfully',
        });
      }
    });
  }
}
