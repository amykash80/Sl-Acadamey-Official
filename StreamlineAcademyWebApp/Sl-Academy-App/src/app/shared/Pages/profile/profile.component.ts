import { Component } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { AddressResponse, ContactResponse } from '../../../Models/Common/Profile';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
constructor(private profileService:ProfileService){}

contactInfo: ContactResponse =new ContactResponse()
addressInfo: AddressResponse =new AddressResponse()
ngOnInit() {
  this.getContactInfo();
  this.getAddressInfo();
}

getContactInfo() {
  this.profileService.contactInfo().subscribe({
    next: (response) => {
      this.contactInfo = response.result;
      console.log(this.contactInfo);
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}
getAddressInfo() {
  this.profileService.addressInfo().subscribe({
    next: (response) => {
      this.addressInfo = response.result;
      console.log(this.addressInfo);
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}
}

