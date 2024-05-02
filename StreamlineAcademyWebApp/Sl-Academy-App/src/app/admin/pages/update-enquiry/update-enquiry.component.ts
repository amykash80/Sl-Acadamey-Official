import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import { Enquiry, EnquiryUpdate } from '../../../Models/Common/enquiry';

@Component({
  selector: 'app-update-enquiry',
  templateUrl: './update-enquiry.component.html',
  styleUrl: './update-enquiry.component.css'
})
export class UpdateEnquiryComponent {
constructor(private enquiryService:EnquiryService){}
enquiryModel: EnquiryUpdate = new EnquiryUpdate()
updateEnquiry()
{
  this.enquiryModel.id ="7dfe534c-c9ee-417e-0f65-08dc6a6fa21a"
  this.enquiryModel.name="Sushree"
  this.enquiryModel.email="s@gmail.com"
  this.enquiryModel.phoneNumber="8984148806"
  this.enquiryService.updateEnquiry(this.enquiryModel).subscribe({
    next:(response)=>{
      console.log(response)
    },
    error:(error)=>
      {
        console.log(error)
      }
  })
}
}
