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
import { CourseResponse } from '../../../Models/Academy/Course';
import { AttendanceResponseModel } from '../../../Models/student/students';
import { ApiResponse } from '../../../Models/Common/api-response';
import { Router } from '@angular/router';
import { AttendenceStatus } from '../../../Enums/AttendenceStatus';

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
    private router: Router,
    private std: StudentService
  ) {}
  model!: { year: number, month: number, day: number };

  academyList: AcademyResponse[] = [];
  enquiryList: EnquiryResponse[] = [];
  academyTypeList: AcademyTypeResponse[] = [];
  scheduleList: BatchScheduleResponseModel[] = [];
  scheduleResponse:any
  batchList: BatchResponseModel[] = [];
  courseList: CourseResponse[] = [];
  status = false;
  selectedDate!: string;
  todaysSchedule!: any;
  showNoSchedule = false;
  showCard = true;
  resultSet: any;
  showSpinner=false;
  presentCount: number = 0;
  absentCount: number = 0;
  lateCount: number = 0;
  ExcusedCount: number = 0;
  addToggle() {
    this.status = !this.status;
  }
  ngOnInit() {
    this.getSchedule();
    this.fetchAttendances();
    this.studentService.getAllMySchedules().subscribe((res) => {
      this.scheduleList = res.result;
    });
    this.studentService.getAllMybatches().subscribe((res) => {
      this.batchList = res.result;
    });
    this.studentService.checkMyCourses().subscribe((res) => {
      this.courseList = res.result;
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

   
    fetchSchedule(): void {
      this.showSpinner=true
      if (this.selectedDate) {
        const selectedDateUTC = new Date(this.selectedDate);
        selectedDateUTC.setMinutes(selectedDateUTC.getMinutes() - selectedDateUTC.getTimezoneOffset());
        const formattedDate = selectedDateUTC.toISOString();
    
        this.studentService.getSchedule(formattedDate).subscribe(
          response => {
            if (response.isSuccess) {
              this.showSpinner=false
              this.scheduleResponse=response.result;
              console.log(this.scheduleResponse)
    
              Swal.fire({
                title: "Schedule Information",
                html: `
                  <p><strong>Date:</strong> ${new Date(this.scheduleResponse[0].date).toLocaleDateString()}</p>
                  <p><strong>Duaration(In Hours):</strong> ${this.scheduleResponse[0].durationInHours}</p>
                  <p><strong>Batch Name:</strong> ${this.scheduleResponse[0].batchName}</p>
                  <p><strong>Content Name:</strong> ${this.scheduleResponse[0].contentName}</p>
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
              this.sharedService.NoDataSwal(response.message)
              this.showSpinner=false
            }
          },
          error => {
            console.error('Error fetching schedule:', error);
          }
        );
      }
      else{
        this.sharedService.showErrorToast("please select date");
        this.showSpinner=false
      }
    }
    
    fetchAttendances(): void {
      this.studentService.getAttendances().subscribe(
        (response: ApiResponse<AttendanceResponseModel[]>) => {
          if (response.isSuccess) {
            this.calculateAttendanceCounts(response.result);
          } else {
            this.sharedService.NoDataSwal(response.message);
            setTimeout(() => {
              this.router.navigate(['/academy/course-list']);
            }, 2000);
          }
        },
        (error) => {
          console.error('Error fetching attendance records:', error);
          // Handle error case if needed
        }
      );
    }
    calculateAttendanceCounts(attendances: AttendanceResponseModel[]): void {
      this.presentCount = 0;
      this.absentCount = 0;
      this.lateCount = 0;
      this.ExcusedCount = 0;
    
      attendances.forEach((attendance) => {
        if (attendance.attendenceStatus) {
          // Assuming attendenceStatus is an array of AttendenceStatus enums
          attendance.attendenceStatus.forEach((status) => {
            switch (status) {
              case AttendenceStatus.Present:
                this.presentCount++;
                break;
              case AttendenceStatus.Absent:
                this.absentCount++;
                break;
              case AttendenceStatus.Late:
                this.lateCount++;
                break;
              case AttendenceStatus.Excused:
                this.ExcusedCount++;
                break;
              default:
                // Handle unexpected status
                break;
            }
          });
        }
      });
}
}
