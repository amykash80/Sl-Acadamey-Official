import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { AcademyType } from '../../../Models/Academy/AcademyType';
import { SharedService } from '../../../Services/shared.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-academy-type',
  templateUrl: './create-academy-type.component.html',
  styleUrl: './create-academy-type.component.css'
})
export class CreateAcademyTypeComponent {
constructor(private _academyService: AcademyService,
            private sharedService:SharedService
){}
academyTypeModel:AcademyType=new AcademyType();
createAcademyType()
{
this._academyService.createAcademyType(this.academyTypeModel).subscribe({
  next:(response)=>{
    console.log(response)
    if(response.isSuccess){
      this.sharedService.showSuccessToast(response.message)
    }
    else{
      this.sharedService.showErrorToast(response.message)
    }
  },
  error:(err:HttpErrorResponse)=>{
    console.log(err)
  }
})
}}
