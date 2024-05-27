import { Component } from '@angular/core';
import { CourseCategoryRequestModel } from '../../../Models/CourseCategory/CourseCategory';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-course-category',
  templateUrl: './add-course-category.component.html',
  styleUrl: './add-course-category.component.css'
})
export class AddCourseCategoryComponent {
  constructor(private courseService:CourseService,
              private sharedService:SharedService,
              private router:Router
  ){}
  loadspinner:boolean=false;
  courseCategoryModel:CourseCategoryRequestModel=new CourseCategoryRequestModel();
  addCategory(){
    this.loadspinner=true;
    this.courseService.addCourseCategory(this.courseCategoryModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
          this.loadspinner=false;
          this.router.navigate(['/academy/course-category-list'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
          this.loadspinner=false;

        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadspinner=false;

      },
    });
  }
}
