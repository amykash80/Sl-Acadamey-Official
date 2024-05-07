import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import { Enquiry, EnquiryResponse } from '../../../Models/Common/enquiry';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrl: './enquirylist.component.css'
})
export class EnquirylistComponent {
constructor(private enquiryService:EnquiryService){}
enquirylist:EnquiryResponse[]=[]
ngOnInit(){
 this.enquiryService.enquiryList().subscribe({
  next:(response)=>{
    this.enquirylist = response.result;
    console.log(this.enquirylist)
  },
  error:(err)=>{
    console.log(err)
  }
 })
}
}
