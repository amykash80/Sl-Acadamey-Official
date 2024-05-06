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
  acdemyList:AcademyResponse[]=[]
  ngOnInit(){
    this.academyService.academyList().subscribe({
     next:(response)=>{
       this.acdemyList = response.result;
       console.log(this.acdemyList)
     },
     error:(err:HttpErrorResponse)=>{
      if(err.status==HttpStatusCode.Unauthorized){
        console.log(err.message)
      }
     }
    })
   }
   }
