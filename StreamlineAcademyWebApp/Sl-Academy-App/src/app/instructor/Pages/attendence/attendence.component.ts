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
  studentList: StudentResponseModel[] = [];

  ngOnInit(): void {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
  this.activatedRoute.params.subscribe(paramVal=>{
    this.scheduleId=paramVal['scheduleId'];
    console.log(this.scheduleId)
  })
    this.loadStudents();
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
