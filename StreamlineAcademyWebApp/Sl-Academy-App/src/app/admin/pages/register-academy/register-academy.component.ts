import { Component, inject } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-academy',
  templateUrl: './register-academy.component.html',
  styleUrl: './register-academy.component.css'
})
export class RegisterAcademyComponent {
academyService=inject(AcademyService)
academyRegistrationModel:RegisterAcademy=new RegisterAcademy()
ngOnInit(){
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
