import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { EnquiryResponse } from '../../../Models/Common/enquiry';
import { AcademyResponse } from '../../../Models/Academy/Academy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public shared:SharedService,
             private sharedService:SharedService
  ){}
  academyList:AcademyResponse[] = [];
  enquiryList:EnquiryResponse[] = [];
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  ngOnInit(){
    this.academyList= this.sharedService.getAllAcademies();
    console.log(this.academyList.length)
    this.enquiryList= this.sharedService.getAllEnquiries();
    console.log(this.enquiryList.length);
  }

 

}
