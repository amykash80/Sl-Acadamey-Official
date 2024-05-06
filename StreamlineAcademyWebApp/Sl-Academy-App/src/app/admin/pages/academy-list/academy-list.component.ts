import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-academy-list',
  templateUrl: './academy-list.component.html',
  styleUrl: './academy-list.component.css'
})
export class AcademyListComponent {
  constructor(private academyService:AcademyService){}
  seeData(){
    this.academyService.academyList().subscribe({
     next:(response)=>{
       console.log(response)
     },
     error:(err:HttpErrorResponse)=>{
      if(err.status==HttpStatusCode.Unauthorized){
        console.log("u r not authorized")
      }
     }
    })
   }
   }
