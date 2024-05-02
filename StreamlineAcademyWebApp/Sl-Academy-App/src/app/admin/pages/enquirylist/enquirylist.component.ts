import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrl: './enquirylist.component.css'
})
export class EnquirylistComponent {
constructor(private enquiryService:EnquiryService){}

ngOnInit(){
 this.enquiryService.enquiryList().subscribe({
  next:(response)=>{
    console.log(response)
  },
  error:(err)=>{
    console.log(err)
  }
 })
}
}
