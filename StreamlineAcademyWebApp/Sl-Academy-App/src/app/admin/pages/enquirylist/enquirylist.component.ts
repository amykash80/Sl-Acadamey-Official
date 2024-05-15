import { Component } from '@angular/core';
import { EnquiryService } from '../../../Services/enquiry.service';
import { Enquiry, EnquiryResponse } from '../../../Models/Common/enquiry';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrl: './enquirylist.component.css'
})
export class EnquirylistComponent {
constructor(private enquiryService:EnquiryService,
            private sharedService:SharedService
){}
enquirylist:EnquiryResponse[]=[]
ngOnInit(){
this.loadAllEnquiries()
}
loadAllEnquiries(){
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
deleteEnquiry(enquiryId: any) {
  console.log(enquiryId);
  
  this.sharedService
    .fireConfirmSwal('Are You sure you want to delete this Enquiry ')
    .then((result:any) => {
      if (result.isConfirmed) {
        this.enquiryService.deleteEnquiry(enquiryId).subscribe({
          next: (response) => {
            console.log(response);
            
            if (response.isSuccess) {
              this.sharedService.showSuccessToast(response.message);
              this.loadAllEnquiries();
            } else {
              this.sharedService.showErrorToast(response.message);
            }
          },
        });
      }
    });
}
}
