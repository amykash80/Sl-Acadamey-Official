import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AcademyResponse } from '../../../Models/Academy/Academy';

@Component({
  selector: 'app-academy-list',
  templateUrl: './academy-list.component.html',
  styleUrl: './academy-list.component.css'
})
export class AcademyListComponent {
  constructor(private academyService:AcademyService){}
<<<<<<< Updated upstream
  academyList:AcademyResponse[]=[]
  ngOnInit(){
=======
  viewAcademy(){
>>>>>>> Stashed changes
    this.academyService.academyList().subscribe({
     next:(response)=>{
       this.academyList = response.result;
       console.log(this.academyList)
     },
     error:(err:HttpErrorResponse)=>{
      if(err.status==HttpStatusCode.Unauthorized){
<<<<<<< Updated upstream
        console.log(err.message)
=======
        console.log("You are not authorized")
>>>>>>> Stashed changes
      }
     }
    })
   }
   }
