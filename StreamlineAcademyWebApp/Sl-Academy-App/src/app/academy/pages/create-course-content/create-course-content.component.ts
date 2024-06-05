import { Component, inject } from '@angular/core';
import { CourseContent, CourseResponse } from '../../../Models/Academy/Course';
import { CourseService } from '../../../Services/course.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-course-content',
  templateUrl: './create-course-content.component.html',
  styleUrl: './create-course-content.component.css'
})
export class CreateCourseContentComponent {
  courseService=inject(CourseService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
courseContentModel:CourseContent=new CourseContent();
courses:CourseResponse[]=[];
courseId:string=''
loadSpinner=false;
courseRes:CourseResponse=new CourseResponse()

ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
    this.courseId=paramVal['id'];
    this.getcourseById()
  })
}
getcourseById(){
  this.courseService.getCourseById(this.courseId).subscribe(data =>{
   this.courseRes=data.result
  })
  }

createCourseContent(){
  this.loadSpinner=true;
  this.courseContentModel.courseId=this.courseId;
  this.courseService.createCourseContent(this.courseContentModel).subscribe({
    next: (response) => {
      console.log(response)
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.loadSpinner=false;
        this.router.navigate(['/academy/course-list'])
      }
      else{
        this.sharedService.showErrorToast(response.message)
        this.loadSpinner=false;
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.BadRequest) {
        console.log(err.message)
        this.loadSpinner=false
      }
    }
  });
}

}
