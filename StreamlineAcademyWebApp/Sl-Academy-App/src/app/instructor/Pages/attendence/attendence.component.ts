import { Component, inject } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { StudentResponseModel } from '../../../Models/student/students';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css'
})
export class AttendenceComponent {
  instructorService=inject(InstructorService)
  instructorId: string = '';
  loggedInUserDetails:any
  studentList: StudentResponseModel[] = [];

  ngOnInit(): void {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.instructorId = this.loggedInUserDetails.userId;
    this.loadStudents();
  }
  loadStudents(): void {
    this.instructorService
      .checkMyAllBatchesStudents(this.instructorId)
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
