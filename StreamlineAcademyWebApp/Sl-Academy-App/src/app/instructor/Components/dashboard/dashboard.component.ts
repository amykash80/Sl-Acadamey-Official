import { Component } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { CourseService } from '../../../Services/course.service';
import { StudentService } from '../../../Services/student.service';
import { InstructorService } from '../../../Services/instructor.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { StudentResponseModel } from '../../../Models/student/students';
import { BatchResponseModel } from '../../../Models/Batch/Batch';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private shared: SharedService,
    private courseService: CourseService,
    private studentService: StudentService,
    private instructorService: InstructorService
  ) {
    
  }
  loggedInUserDetails!:any
  instructorId:string=''
  ngOnInit(){
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!) 
    console.log(this.loggedInUserDetails)
    this.instructorId=this.loggedInUserDetails.userId

    this.loadCourses();
    this.loadBatches();
    this.loadAllStudents()
   
  }
  coursesList: CourseResponse[] = [];
  batchList: BatchResponseModel[] = [];
  InstructorList: InstructorResponseModel[] = [];
  StudentList: StudentResponseModel[] = [];

  loadCourses() {
    this.instructorService.checkMyCourses().subscribe((d) => {
      this.coursesList = d.result;
    });
  }
   
  loadBatches() {
    this.instructorService.checkMyBatches().subscribe((data) => {
      this.batchList = data.result;
    });
  }
  loadAllStudents() {
    this.instructorService.checkMyAllBatchesStudents(this.instructorId).subscribe((data) => {
      this.StudentList = data.result;
      console.log(this.StudentList)
    });
  }
  
}


