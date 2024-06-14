import { Component, inject } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { StudentResponseModel } from '../../../Models/student/students';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css'
})
export class AttendenceComponent {
  instructorService=inject(InstructorService)
  activatedRoute=inject(ActivatedRoute)
  scheduleId: string = '';
  loggedInUserDetails:any
  currentDate!: string;
  studentList: StudentResponseModel[] = [];

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
  }
  loadStudents(): void {
    this.instructorService
      .checkMyScheduleStudents(this.scheduleId)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.studentList=response.result
        
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
