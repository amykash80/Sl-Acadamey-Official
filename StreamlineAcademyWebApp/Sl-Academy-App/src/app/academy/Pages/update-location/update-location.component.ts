import { Component } from '@angular/core';
import { LocationService } from '../../../Services/location.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationResponseModel, UpdateLocationModel } from '../../../Models/Location/Location';
import { CountryService } from '../../../Services/country.service';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrl: './update-location.component.css'
})
export class UpdateLocationComponent {
  locationId:string=''
  selectedCountryId:string=''
  selectedStateId:string=''
  location:LocationResponseModel=new LocationResponseModel()
  updateLocationModel:UpdateLocationModel=new UpdateLocationModel()
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  constructor(
    private locationService: LocationService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router:Router,
    private countryService:CountryService
  ) {
    this.route.params.subscribe((params) => {
      this.locationId = params['id'];
      this.locationService.getLocationById(this.locationId).subscribe(location=>{
        this.location=location.result;
      })
    });
  }
  ngOnInit(){
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
  }

  getAllCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.result;
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
    });
  }
  filterStates(event: any) {
    this.selectedCountryId = event.target.value;
    this.filteredStates = this.states.filter(
      (state) => state.countryId === this.selectedCountryId
    );
  }
  filteredCities(event: any) {
    this.selectedStateId = event.target.value;
    this.filteredCitiesList = this.cities.filter(
      (city) => city.sateId === this.selectedStateId
    );
  }
  updateLocation(){
  this.updateLocationModel=this.location;
  this.locationService.updateLocation(this.updateLocationModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
        this.router.navigate(['/academy/location-list'])
      }
      else{
        this.sharedService.showErrorToast(response.message)
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
  }
}
