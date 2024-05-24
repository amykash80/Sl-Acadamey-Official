import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { EnquiryResponse } from '../../../Models/Common/enquiry';
import { AcademyResponse } from '../../../Models/Academy/Academy';
import { AcademyService } from '../../../Services/academy.service';
import { EnquiryService } from '../../../Services/enquiry.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public shared:SharedService,
             private sharedService:SharedService,
             private academyService:AcademyService,
             private enquiryService:EnquiryService
  ){}
  academyList:AcademyResponse[] = [];
  enquiryList:EnquiryResponse[] = [];
  academyTypeList:AcademyTypeResponse[] = [];
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  ngOnInit(){
   this.enquiryService.enquiryList().subscribe(response=>{
    this.enquiryList=response.result
    
   })
   this.academyService.academyList().subscribe(response=>{
    this.academyList=response.result
    
   })
   this.academyService.getAcademyTypes().subscribe(res=>{
    this.academyTypeList=res.result
   })
  }
  

 

}
