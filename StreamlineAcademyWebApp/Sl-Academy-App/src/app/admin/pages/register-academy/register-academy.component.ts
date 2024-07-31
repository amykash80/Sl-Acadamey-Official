import { Component, ElementRef, inject, resolveForwardRef, ViewChild } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../../../Services/country.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-academy',
  templateUrl: './register-academy.component.html',
  styleUrl: './register-academy.component.css',
})
export class RegisterAcademyComponent {

  academyService = inject(AcademyService);
  countryService = inject(CountryService);
  router = inject(Router);
  sharedService = inject(SharedService);
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  academyTypeList: AcademyTypeResponse[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  academyRegistrationModel: RegisterAcademy = new RegisterAcademy();
  loadSpinner: boolean = false;
  constructor() {}
  @ViewChild('academyRegistrationForm') academyRegistrationForm!: NgForm;
  @ViewChild('adminNameInput') adminNameInput!: ElementRef;
  @ViewChild('academyNameInput') academyNameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('phoneNumberInput') phoneNumberInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('addressInput') addressInput!: ElementRef;
  @ViewChild('postalCodeInput') postalCodeInput!: ElementRef;
  @ViewChild('academyTypeInput') academyTypeInput!: ElementRef;
  @ViewChild('countryInput') countryInput!: ElementRef;
  @ViewChild('stateInput') stateInput!: ElementRef;
  @ViewChild('cityInput') cityInput!: ElementRef;

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllAcademyTypes();
  }
  getAllAcademyTypes() {
    this.academyService.getAcademyTypes().subscribe((academyTypes) => {
      this.academyTypeList = academyTypes.result;
      console.log(this.academyTypeList);
    });
  }
  getAllCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.result;
      console.log(this.countries);
    });
  }
  getAllStates() {
    this.countryService.getStates().subscribe((res) => {
      this.states = res.result.sort((a:any, b:any) => a.stateName.localeCompare(b.stateName));
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
  onRegisterClick() {
    if (this.academyRegistrationForm.invalid) {
      if (!this.academyRegistrationModel.name) {
        this.adminNameInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.academyName) {
        this.academyNameInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.email) {
        this.emailInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.phoneNumber) {
        this.phoneNumberInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.password) {
        this.passwordInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.address) {
        this.addressInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.postalCode) {
        this.postalCodeInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.academyTypeId) {
        this.academyTypeInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.countryId) {
        this.countryInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.stateId) {
        this.stateInput.nativeElement.focus();
      } else if (!this.academyRegistrationModel.cityId) {
        this.cityInput.nativeElement.focus();
      }
    }
    else{
      this.registerAcademy()

    }
  }


  registerAcademy() {
    this.loadSpinner = true;
    this.academyRegistrationModel.postalCode =
      this.academyRegistrationModel.postalCode?.toString();
    this.academyService.createAcademy(this.academyRegistrationModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.loadSpinner = false;

          this.router.navigate(['/admin/academylist']);
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadSpinner = false;
      },
    });
  }
}
