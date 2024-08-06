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
  ) {}
  userId: any;
  ngOnInit() {
    this.getUserIdFromLocalStorage();
    this.courseList();
    this.InstructorListItems();
    this.stdList();
  }

  coursesList: CourseResponse[] = [];
  InstructorList: InstructorResponseModel[] = [];
  StudentList: StudentResponseModel[] = [];

  courseList() {
    this.courseService.courseList(this.userId).subscribe((d) => {
      this.coursesList = d.result;
    });
  }
  getUserIdFromLocalStorage(): void {
    const responseObjStr = localStorage.getItem('responseObj');

    if (responseObjStr) {
      try {
        const responseObj = JSON.parse(responseObjStr);

        this.userId = responseObj.userId;

        console.log('User ID:', this.userId);
      } catch (error) {
        console.error('Error parsing local storage object:', error);
      }
    } else {
      console.warn('No responseObj found in local storage.');
    }
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
