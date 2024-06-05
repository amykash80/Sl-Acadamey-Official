import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { EnquiryResponse } from '../../../Models/Common/enquiry';
import { AcademyResponse } from '../../../Models/Academy/Academy';
import { AcademyService } from '../../../Services/academy.service';
import { EnquiryService } from '../../../Services/enquiry.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import Swal from 'sweetalert2';
import { StudentService } from '../../../Services/student.service';
import { BatchScheduleResponseModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { BatchResponseModel } from '../../../Models/Batch/Batch';

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
    private studentService: StudentService,
    private std:StudentService
  ) {
 
  }
  academyList: AcademyResponse[] = [];
  enquiryList: EnquiryResponse[] = [];
  academyTypeList: AcademyTypeResponse[] = [];
  scheduleList: BatchScheduleResponseModel[] = []; 
  batchList:BatchResponseModel[]=[]
  status = false;
  resultSet:any
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
    this.studentService.getAllMySchedules().subscribe((res) => {
      this.scheduleList = res.result;
    });
    this.studentService.getAllMybatches().subscribe((res) => {
      this.batchList = res.result;
    });
  }
  showPopup(){
    this.std.checkMyTodaysSchedule().subscribe(res => {
      if (res.isSuccess) {
        console.log(res)
        const { date, durationInHours, batchName, contentName } = res.result[0]; 
        const formattedDate = new Date(date!).toLocaleDateString();
        Swal.fire({
          title: "schedule Information",
          html: `
          <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Duration in Hours:</strong> ${durationInHours}</p>
            <p><strong>Batch Name:</strong> ${batchName}</p>
            <p><strong>Content Name:</strong> ${contentName}</p>
          `,
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
      else{
        Swal.fire(res.message);
      }
    });
  
  }
}
