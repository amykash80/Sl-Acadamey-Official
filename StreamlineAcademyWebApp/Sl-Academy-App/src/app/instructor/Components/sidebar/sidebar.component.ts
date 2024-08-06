import { Component } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { InstructorService } from '../../../Services/instructor.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private sharedService: SharedService,
    private instructorService: InstructorService
  ) {}
  acdemyId: any;
  courseList: CourseResponse[] = [];
  acdemyName: any;
  ngOnInit(): void {
    this.loadAllCourse();
  }
  loadAllCourse() {
    this.instructorService.checkMyCourses().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log('my courses are', response);
          this.courseList = response.result;
          this.acdemyName = this.courseList[0].academyName;
          this.getAcademyByName();
          console.log(this.acdemyName);
        } else {
          this.sharedService.showErrorToast(response.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }

  getAcademyByName() {
    console.log('inside method', this.acdemyName);
    this.instructorService
      .getAcademyByName(this.acdemyName)
      .subscribe((res) => {
        console.log(res);
        this.acdemyId = res.result.id;
        console.log("academyid retreived is",this.acdemyId)
      });
  }
}
