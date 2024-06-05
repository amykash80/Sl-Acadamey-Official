import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { EnquiryResponse } from '../../../Models/Common/enquiry';
import { AcademyResponse } from '../../../Models/Academy/Academy';
import { AcademyService } from '../../../Services/academy.service';
import { EnquiryService } from '../../../Services/enquiry.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import Swal from 'sweetalert2';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    public shared: SharedService,
    private sharedService: SharedService,
    private academyService: AcademyService,
    private enquiryService: EnquiryService,
    private std:StudentService
  ) {
 
  }
  academyList: AcademyResponse[] = [];
  enquiryList: EnquiryResponse[] = [];
  academyTypeList: AcademyTypeResponse[] = [];
  status = false;
  addToggle() {
    this.status = !this.status;
  }
  ngOnInit() {
    this.enquiryService.enquiryList().subscribe((response) => {
      this.enquiryList = response.result;
    });
    this.academyService.academyList().subscribe((response) => {
      this.academyList = response.result;
    });
    this.academyService.getAcademyTypes().subscribe((res) => {
      this.academyTypeList = res.result;
    });
  }
  showPopup(){
    this.std.getStudentById("233").subscribe(res=>{
    if(res.isSuccess){
      Swal.fire({
        title: "Custom animation with Animate.css",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
    })
  
  }
}
