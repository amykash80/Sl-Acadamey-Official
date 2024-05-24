import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import {
  AddressResponse,
  ContactResponse,
  UpdateAddress,
  UpdateContact,
} from '../../../Models/Common/Profile';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../../../Models/Common/AppModule';
import { UserRole } from '../../../Enums/userrole';
import { FileResponse } from '../../../Models/Common/fileResponse';
import { environment } from '../../../../enviroments/enviroment';
import { CountryService } from '../../../Services/country.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private profileService: ProfileService,
    private sharedService: SharedService,
    private countryService:CountryService
  ) {
    this.getContactInfo();
    this.getAddressInfo();
    this.getPath();
  }

  contactInfo: ContactResponse = new ContactResponse();
  addressInfo: AddressResponse = new AddressResponse();
  fileResponseModel: FileResponse = new FileResponse();
  isContactEditMode: boolean = false;
  isAddressEditMode: boolean = false;
  contactModel: UpdateContact = new UpdateContact();
  addressModel: UpdateAddress = new UpdateAddress();
  file!: File;
  changeProfile!:File
  fileId: string = '';
  filePath: string = '';
  apiBaseUrl: string = 'http://localhost:5232';
  module!: AppModule;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
   
  }
  getAllCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.result;
      console.log(this.countries);
    });
  }
  getAllStates() {
    this.countryService.getStates().subscribe((res) => {
      this.states = res.result;
    });
  }
  getAllCities() {
    this.countryService.getCities().subscribe((res) => {
      this.cities = res.result;
      console.log(this.cities);
    });
  }
  filterStates(event: any) {
    this.selectedCountryId = event.target.value;
    this.filteredStates = this.states.filter(
      (state) => state.countryId === this.selectedCountryId
    );
    console.log(this.filteredStates);
  }
  filteredCities(event: any) {
    this.selectedStateId = event.target.value;
    this.filteredCitiesList = this.cities.filter(
      (city) => city.sateId === this.selectedStateId
    );
    console.log(this.filteredCitiesList);
  }
  getPath() {
    this.profileService.getImagePath().subscribe((response) => {
      this.filePath = response.result.filePath!;
      this.fileId = response.result.id!;
      console.log(this.filePath);
      console.log(this.fileId);

    });
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
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
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
      },
    });
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    const form = new FormData();
    form.append('File', this.file);
    if (this.contactInfo.userRole === UserRole.SuperAdmin) {
      form.append('Module', AppModule.SuperAdmin.toString());
    } else if (this.contactInfo.userRole === UserRole.AcademyAdmin) {
      form.append('Module', AppModule.AcademyAdmin.toString());
    } else if (this.contactInfo.userRole === UserRole.Instructor) {
      form.append('Module', AppModule.Instructor.toString());
    } else if (this.contactInfo.userRole === UserRole.Student) {
      form.append('Module', AppModule.Student.toString());
    }
    this.profileService.uploadImage(form).subscribe((res) => {
      if (res.isSuccess) {
        this.sharedService.showSuccessToast(res.message);
        this.fileResponseModel = res.result;
        this.filePath = res.result.filePath!;
      } else {
        this.sharedService.showErrorToast(res.message);
      }
    });
  }
  showFileInput(event:any) {
    this.changeProfile = event.target.files[0];
    this.changeProfilePicture();
  }
  changeProfilePicture() {
    const form = new FormData();
    form.append('File', this.changeProfile);
    form.append('Id', this.fileId);
    if (this.contactInfo.userRole === UserRole.SuperAdmin) {
      form.append('Module', AppModule.SuperAdmin.toString());
    } else if (this.contactInfo.userRole === UserRole.AcademyAdmin) {
      form.append('Module', AppModule.AcademyAdmin.toString());
    } else if (this.contactInfo.userRole === UserRole.Instructor) {
      form.append('Module', AppModule.Instructor.toString());
    } else if (this.contactInfo.userRole === UserRole.Student) {
      form.append('Module', AppModule.Student.toString());
    }
    this.profileService.changeProfilePicture(form).subscribe((res) => {
      if (res.isSuccess) {
        this.sharedService.showSuccessToast(res.message);
        this.fileResponseModel = res.result;
        this.filePath = res.result.filePath!;
      } else {
        this.sharedService.showErrorToast(res.message);
      }
    });
  }
}
