import { Component, inject } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../../../Services/country.service';

@Component({
  selector: 'app-register-academy',
  templateUrl: './register-academy.component.html',
  styleUrl: './register-academy.component.css'
})
export class RegisterAcademyComponent {
academyService=inject(AcademyService)
countryService = inject(CountryService);

academyRegistrationModel:RegisterAcademy=new RegisterAcademy()
countries: any[] = []; 
selectedCountry: string = ''; 
usStates = [
{ name: 'Alabama', abbreviation: 'AL' },
{ name: 'Alaska', abbreviation: 'AK' },
{ name: 'Arizona', abbreviation: 'AZ' },
{ name: 'Arkansas', abbreviation: 'AR' },
{ name: 'California', abbreviation: 'CA' },
{ name: 'Colorado', abbreviation: 'CO' },
{ name: 'Connecticut', abbreviation: 'CT' },
{ name: 'Delaware', abbreviation: 'DE' },
{ name: 'Florida', abbreviation: 'FL' },
{ name: 'Georgia', abbreviation: 'GA' },
{ name: 'Hawaii', abbreviation: 'HI' },
{ name: 'Idaho', abbreviation: 'ID' },
{ name: 'Illinois', abbreviation: 'IL' },
{ name: 'Indiana', abbreviation: 'IN' },
{ name: 'Iowa', abbreviation: 'IA' },
{ name: 'Kansas', abbreviation: 'KS' },
{ name: 'Kentucky', abbreviation: 'KY' },
{ name: 'Louisiana', abbreviation: 'LA' },
{ name: 'Maine', abbreviation: 'ME' },
{ name: 'Maryland', abbreviation: 'MD' },
{ name: 'Massachusetts', abbreviation: 'MA' },
{ name: 'Michigan', abbreviation: 'MI' },
{ name: 'Minnesota', abbreviation: 'MN' },
{ name: 'Mississippi', abbreviation: 'MS' },
{ name: 'Missouri', abbreviation: 'MO' },
{ name: 'Montana', abbreviation: 'MT' },
{ name: 'Nebraska', abbreviation: 'NE' },
{ name: 'Nevada', abbreviation: 'NV' },
{ name: 'New Hampshire', abbreviation: 'NH' },
{ name: 'New Jersey', abbreviation: 'NJ' },
{ name: 'New Mexico', abbreviation: 'NM' },
{ name: 'New York', abbreviation: 'NY' },
{ name: 'North Carolina', abbreviation: 'NC' },
{ name: 'North Dakota', abbreviation: 'ND' },
{ name: 'Ohio', abbreviation: 'OH' },
{ name: 'Oklahoma', abbreviation: 'OK' },
{ name: 'Oregon', abbreviation: 'OR' },
{ name: 'Pennsylvania', abbreviation: 'PA' },
{ name: 'Rhode Island', abbreviation: 'RI' },
{ name: 'South Carolina', abbreviation: 'SC' },
{ name: 'South Dakota', abbreviation: 'SD' },
{ name: 'Tennessee', abbreviation: 'TN' },
{ name: 'Texas', abbreviation: 'TX' },
{ name: 'Utah', abbreviation: 'UT' },
{ name: 'Vermont', abbreviation: 'VT' },
{ name: 'Virginia', abbreviation: 'VA' },
{ name: 'Washington', abbreviation: 'WA' },
{ name: 'West Virginia', abbreviation: 'WV' },
{ name: 'Wisconsin', abbreviation: 'WI' },
{ name: 'Wyoming', abbreviation: 'WY' },
];

// states: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err: HttpErrorResponse) => console.error('Error fetching countries:', err),
    });
  }
  isUSASelected(): boolean {
    return this.selectedCountry === 'US'; 
  }
  onCountryChange() {
    if (!this.isUSASelected()) {
      this.academyRegistrationModel.stateId = ''; 
    }
  }
  // state(): void {
  //   this.countryService.getStates().subscribe({
  //     next: (data) => {
  //       this.states = data;
  //     },
  //     error: (err: HttpErrorResponse) => console.error('Error fetching countries:', err),
  //   });
  // }
  // onCountryChange(event: any): void {
  //   const selectedCountryId = event.target.value;
  //   this.fetchStatesByCountry(selectedCountryId); 
  // }

  // fetchStatesByCountry(countryId: string): void {
    
  //   this.countryService.getStatesByCountry(countryId).subscribe({
  //     next: (data) => {
  //       this.states = data;
  //     },
  //     error: (err: HttpErrorResponse) => console.error('Error fetching states:', err),
  //   });
  // }

registerAcademy(){
  this.academyService.createAcademy(this.academyRegistrationModel).subscribe({
    next:(response)=>{
      console.log(response)
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err)
    }
   })
}
}
