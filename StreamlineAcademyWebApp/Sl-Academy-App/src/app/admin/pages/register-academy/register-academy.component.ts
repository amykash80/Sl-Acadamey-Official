import { Component, inject, resolveForwardRef } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../../../Services/country.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-register-academy',
  templateUrl: './register-academy.component.html',
  styleUrl: './register-academy.component.css',
})
export class RegisterAcademyComponent {
  academyService = inject(AcademyService);
  countryService = inject(CountryService);
  sharedService=inject(SharedService)
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  academyTypeList:AcademyTypeResponse[]=[];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  academyRegistrationModel: RegisterAcademy = new RegisterAcademy();
  constructor() {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllAcademyTypes();
  }
  getAllAcademyTypes(){
    this.academyService.getAcademyTypes().subscribe(academyTypes=>{
      this.academyTypeList=academyTypes.result
      console.log(this.academyTypeList)
    })
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

  registerAcademy() {
    this.academyRegistrationModel.postalCode=this.academyRegistrationModel.postalCode?.toString();
    this.academyService.createAcademy(this.academyRegistrationModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
