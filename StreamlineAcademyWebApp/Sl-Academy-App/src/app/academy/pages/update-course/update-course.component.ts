import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { UpdateCourse } from '../../../Models/Academy/Course';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})

export class UpdateCourseComponent {
  router: any;
  constructor(private courseService:CourseService,
              private sharedService:SharedService
  ){}
  courseModel: UpdateCourse = new UpdateCourse()
  updateCourse()
  {
   
    this.courseService.updateCourse(this.courseModel).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message);
         this.router.navigate(['/academy/course-list'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  }