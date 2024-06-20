import { Component, inject } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { SaveAttendence, StudentResponseModel } from '../../../Models/student/students';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../Models/Common/api-response';
import { AttendenceStatus } from '../../../Enums/AttendenceStatus';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css'
})
export class AttendenceComponent {
  instructorService=inject(InstructorService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  
  attendanceData: SaveAttendence[] = [];
  attendanceMap: { [studentId: string]: AttendenceStatus } = {};
  filteredStudentList: StudentResponseModel[] = [];
  scheduleId: string = '';
  loggedInUserDetails:any
  currentDate!: string;
  studentList: StudentResponseModel[] = [];
  attendanceStatusList: AttendenceStatus[] = [];
  studentIdList: string[] = [];
  // markedAttendanceDate: string | undefined;
  
  ngOnInit(): void {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
  this.activatedRoute.params.subscribe(paramVal=>{
    this.scheduleId=paramVal['scheduleId'];
    console.log(this.scheduleId)
    this.updateCurrentDate()
  })
    this.loadStudents();
  }
  updateCurrentDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    this.currentDate = `${month}/${day}/${year}`;
  //   const date = new Date();
  // this.currentDate = date.toISOString();
  // this.markedAttendanceDate = date.toLocaleDateString();
  }
  loadStudents(): void {
    
    this.instructorService
      .checkMyScheduleStudents(this.scheduleId)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
          
            this.studentList = response.result;
            this.filteredStudentList = this.studentList;
            
            
            if (response.result.length > 0) {
              
            }
          } else {
            this.sharedService.NoDataSwal(response.message);
            setTimeout(()=>{
              this.router.navigate(['/academy/course-list'])
  
            },2000)
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }

    updateAttendance(studentId: string | undefined, status: number): void {
      if (studentId) {
        this.attendanceMap[studentId] = status as AttendenceStatus;
      }
    }
    parseDate(dateString: string): Date {
      const [month, day, year] = dateString.split('/');
      return new Date(+year, +month - 1, +day);
    }
  saveAttendance() {
    // if (this.markedAttendanceDate === new Date().toLocaleDateString()) {
    //   console.log('Attendance already marked for today.');
    //   return;
    // }
    const date = this.parseDate(this.currentDate);
    const isoDateString = date.toISOString();
    this.attendanceStatusList = []; 
    this.studentIdList = []; 
  
    this.filteredStudentList.forEach(student => {
      this.attendanceStatusList.push(this.attendanceMap[student.id!] ?? AttendenceStatus.Absent);
      this.studentIdList.push(student.id!);
    });
  
    const attendanceData = {
      attendanceDate: this.currentDate,
      AttendenceStatus: this.attendanceStatusList,
      StudentId: this.studentIdList,
      scheduleId: this.scheduleId
    };
  
    this.instructorService.saveAttendance(attendanceData)
    .subscribe(
      response => {
        if (response.isSuccess) {
          Swal.fire('Success', 'Attendance marked successfully!', 'success');
        } else {
          console.log('Attendance not saved:', response.message);
          Swal.fire('Massage', response.message, 'error');
        }
      },
        error => {
          console.error('Error saving attendance:', error);
          Swal.fire('Error', 'Failed to save attendance.', 'error');
        }
      );
  }
  }



