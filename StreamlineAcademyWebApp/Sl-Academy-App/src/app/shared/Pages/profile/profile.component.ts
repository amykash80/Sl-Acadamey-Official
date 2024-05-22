import { Component } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { AddressResponse, ContactResponse, UpdateAddress, UpdateContact } from '../../../Models/Common/Profile';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../../../Models/Common/AppModule';
import { UserRole } from '../../../Enums/userrole';
import { FileResponse } from '../../../Models/Common/fileResponse';
import { environment } from '../../../../enviroments/enviroment';

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
fileResponseModel:FileResponse=new FileResponse()
isContactEditMode: boolean = false; 
isAddressEditMode: boolean = false;
contactModel: UpdateContact = new UpdateContact();
addressModel: UpdateAddress = new UpdateAddress();
file!: File
filePath:string=''
apiBaseUrl:string='http://localhost:5232'
module!:AppModule
ngOnInit() {
  this.getContactInfo();
  this.getAddressInfo();
  this.getPath()
}
getPath(){
this.profileService.getImagePath().subscribe(response =>{
  this.filePath=response.result.filePath!;
  console.log(this.filePath)
})
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
      console.log(this.contactInfo)
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
getFile(event:any){
  this.file = event.target.files[0];
  this.uploadImage();
}

uploadImage(){
const form=new FormData();
form.append('File', this.file)
if (this.contactInfo.userRole === UserRole.SuperAdmin) {
  form.append('Module', AppModule.SuperAdmin.toString());
} else if (this.contactInfo.userRole === UserRole.AcademyAdmin) {
  form.append('Module', AppModule.AcademyAdmin.toString());
} else if (this.contactInfo.userRole === UserRole.Instructor) {
  form.append('Module', AppModule.Instructor.toString());
} else if (this.contactInfo.userRole === UserRole.Student) {
  form.append('Module', AppModule.Student.toString());
} 
this.profileService.uploadImage(form).subscribe(res=>{
  if(res.isSuccess){
    this.sharedService.showSuccessToast(res.message);
    this.fileResponseModel=res.result;
  }
  else{
    this.sharedService.showErrorToast(res.message);
  }
})
}

}


