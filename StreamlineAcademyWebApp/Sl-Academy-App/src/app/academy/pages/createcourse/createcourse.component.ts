import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CreateCourse } from '../../../Models/Academy/Course';
import { JSDocComment } from '@angular/compiler';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrl: './createcourse.component.css'
})
export class CreateCourseComponent {
  courseService =inject(CourseService)
  sharedService=inject(SharedService)
  courseModel: CreateCourse = new CreateCourse();
  categories: any[] = [];
  academyId:string=''
  constructor() {}

  ngOnInit(): void {
    this.getAllCategory();
    this.academyId = localStorage.getItem('userId')!
    console.log(this.academyId)    
  }
  getAllCategory() {
    this.courseService.getCategories().subscribe((categories) => {
      this.categories = categories.result;
      console.log(this.categories);
    
    });
  }

  createCourse() {
    this.courseService.createCourse(this.courseModel).subscribe({
      next: (response) => {
        console.log(response)
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message)
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message)
        }
      }
    });
  }
}
