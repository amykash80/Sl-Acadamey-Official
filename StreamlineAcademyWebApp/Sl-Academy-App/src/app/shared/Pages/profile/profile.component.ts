import { Component } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { AddressResponse, ContactResponse, UpdateAddress, UpdateContact } from '../../../Models/Common/Profile';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
constructor(private profileService:ProfileService,
            private sharedService:SharedService){}

contactInfo: ContactResponse =new ContactResponse();
addressInfo: AddressResponse =new AddressResponse();
isContactEditMode: boolean = false; 
isAddressEditMode: boolean = false;
contactModel: UpdateContact = new UpdateContact();
addressModel: UpdateAddress = new UpdateAddress();
ngOnInit() {
  this.getContactInfo();
  this.getAddressInfo();
}
toggleContactEditMode() {
  this.isContactEditMode = !this.isContactEditMode;
  if (this.isContactEditMode) {
    this.contactModel = { ...this.contactInfo };
  }
}

toggleAddressEditMode() {
  this.isAddressEditMode = !this.isAddressEditMode;
  if (this.isAddressEditMode) {
    this.addressModel = { ...this.addressInfo };
  }
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

saveContact() {
  this.profileService.updateContact(this.contactModel).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.contactInfo = { ...this.contactModel };
        this.isContactEditMode = false; 
      } else {
        this.sharedService.showErrorToast(response.message);
      }
    },
    error: (err) => {
      console.error(err);
    },
  });
}

saveAddress() {
  this.profileService.updateAddress(this.addressModel).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.addressInfo = { ...this.addressModel };
        this.isAddressEditMode = false; 
      } else {
        this.sharedService.showErrorToast(response.message);
      }
    },
    error: (err) => {
      console.error(err);
    },
  });
}
}



