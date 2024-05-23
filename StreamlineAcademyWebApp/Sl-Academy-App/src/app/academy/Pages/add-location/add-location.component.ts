import { Component, inject } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { CountryService } from '../../../Services/country.service';
import { SharedService } from '../../../Services/shared.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { LocationRequestModel } from '../../../Models/Location/Location';
import { LocationService } from '../../../Services/location.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent {
  locationService = inject(LocationService);
  countryService = inject(CountryService);
  sharedService=inject(SharedService)
  router=inject(Router)
  academyId:string=''
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  loadSpinner=false
  locationModel: LocationRequestModel = new LocationRequestModel();
  constructor() {}

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

  addLocation() {
    this.loadSpinner=true;
    this.locationModel.postalCode=this.locationModel.postalCode?.toString();
    this.locationService.addLocation(this.locationModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
          this.loadSpinner=false;
          this.router.navigate(['/academy/location-list'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
          this.loadSpinner=false;

        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadSpinner=false;

      },
    });
   }
}
