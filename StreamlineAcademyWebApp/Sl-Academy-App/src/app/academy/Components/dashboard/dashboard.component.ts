import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { CourseService } from '../../../Services/course.service';
import { InstructorService } from '../../../Services/instructor.service';
import { StudentResponseModel } from '../../../Models/student/students';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private shared: SharedService,
    private courseService: CourseService,
    private studentService: StudentService,
    private instructorService: InstructorService
  ) {
    
  }
  ngOnInit(){
    this.courseList();
    this.InstructorListItems();
    this.stdList();
  }

   

  coursesList: CourseResponse[] = [];
  InstructorList: InstructorResponseModel[] = [];
  StudentList: StudentResponseModel[] = [];

  courseList() {
    this.courseService.courseList().subscribe((d) => {
      this.coursesList = d.result;
    });
  }
   InstructorListItems() {
    this.instructorService.instructorList().subscribe((i) => {
      this.InstructorList = i.result;
    });
  }
  stdList() {
    this.studentService.studentList().subscribe((res) => {
      this.StudentList = res.result;
    });
  }
}
