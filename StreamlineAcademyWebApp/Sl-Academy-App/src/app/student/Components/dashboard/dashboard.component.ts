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
    private std: StudentService
  ) {}
  academyList: AcademyResponse[] = [];
  enquiryList: EnquiryResponse[] = [];
  academyTypeList: AcademyTypeResponse[] = [];
  scheduleList: BatchScheduleResponseModel[] = [];
  batchList: BatchResponseModel[] = [];
  status = false;
  todaysSchedule!: any;
  showNoSchedule = false;
  showCard = true;
  resultSet: any;
  addToggle() {
    this.status = !this.status;
  }
  ngOnInit() {
    this.getSchedule();

    this.studentService.getAllMySchedules().subscribe((res) => {
      this.scheduleList = res.result;
    });
    this.studentService.getAllMybatches().subscribe((res) => {
      this.batchList = res.result;
    });
  }
  getSchedule() {
    this.studentService.checkMyTodaysSchedule().subscribe((res) => {
      if (res.isSuccess) {
        this.todaysSchedule = res.result;
      } else {
        this.showNoSchedule = true;
      }
    });
  }
}
