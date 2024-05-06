import { Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  toast = inject(HotToastService)

  getToken(): string {
    return localStorage.getItem("streamlineToken")
      ? JSON.parse(localStorage['streamlineToken'])
      : '';
  }
  showSuccessToast(message: string) {
    this.toast.success(message)
  }
  showErrorToast(message: string) {
    this.toast.error(message)
  }
  showLoader(){
    this.toast.loading("Logging IN")
  }


}
