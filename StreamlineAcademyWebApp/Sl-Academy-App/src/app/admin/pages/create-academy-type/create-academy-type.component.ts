import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { AcademyType } from '../../../Models/Academy/AcademyType';
import { SharedService } from '../../../Services/shared.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-academy-type',
  templateUrl: './create-academy-type.component.html',
  styleUrl: './create-academy-type.component.css'
})
export class CreateAcademyTypeComponent {
constructor(private _academyService: AcademyService,
            private sharedService:SharedService,
            private router:Router
){}
loadSpinner=false;
academyTypeModel:AcademyType=new AcademyType();
createAcademyType()
{
  this.loadSpinner=true;
this._academyService.createAcademyType(this.academyTypeModel).subscribe({
  next:(response)=>{
    console.log(response)
    if(response.isSuccess){
      this.loadSpinner=false;
      this.sharedService.showSuccessToast(response.message)
      this.router.navigate(['/admin/academy-type-list'])
    }
    else{
      this.loadSpinner=false
      this.sharedService.showErrorToast(response.message)
    }
  },
  error:(err:HttpErrorResponse)=>{
    console.log(err)
  }
})
}}
