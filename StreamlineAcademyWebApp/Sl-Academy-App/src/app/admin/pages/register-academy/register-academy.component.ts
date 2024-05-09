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

  constructor() {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err: HttpErrorResponse) => console.error('Error fetching countries:', err),
    });
  }
  
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
