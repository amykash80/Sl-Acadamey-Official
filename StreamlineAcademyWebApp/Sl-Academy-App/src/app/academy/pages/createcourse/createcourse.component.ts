import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CreateCourse } from '../../../Models/Academy/Course';
import { JSDocComment } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrl: './createcourse.component.css',
})
export class CreateCourseComponent {
  courseService = inject(CourseService);
  sharedService = inject(SharedService);

  courseModel: CreateCourse = new CreateCourse();
  categories: any[] = [];
  academyId: string = '';
  loadSpinner = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getAllCategory();
    this.academyId = JSON.parse(localStorage.getItem('responseObj')!).userId!;
    console.log(this.academyId);
  }
  getAllCategory() {
    this.courseService.getCategories().subscribe((categories) => {
      this.categories = categories.result;
      console.log(this.categories);
    });
  }

  createCourse() {
    this.loadSpinner = true;
    this.courseModel.academyId = this.academyId;
    this.courseService.createCourse(this.courseModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.loadSpinner = false;

          this.router.navigate(['/academy/course-list']);
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          this.loadSpinner = false;

          console.log(err.message);
        }
      },
    });
  }
}
