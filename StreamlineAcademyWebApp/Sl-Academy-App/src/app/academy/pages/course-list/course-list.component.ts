import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  constructor(
    private courseServices: CourseService,
    private sharedService: SharedService
  ) {}
  courseList: CourseResponse[] = [];
  
  ngOnInit() {
    this.loadAllCourse();
  }

  loadAllCourse() {
    this.courseServices.courseList().subscribe({
      next: (response) => {
        this.courseList = response.result;
        console.log(this.courseList);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }
}
