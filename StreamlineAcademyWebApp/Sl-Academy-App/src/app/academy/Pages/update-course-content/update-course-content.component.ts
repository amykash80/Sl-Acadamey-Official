import { Component, inject } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseContentResponse, UpdateCourseContent } from '../../../Models/Academy/Course';

@Component({
  selector: 'app-update-course-content',
  templateUrl: './update-course-content.component.html',
  styleUrl: './update-course-content.component.css'
})
export class UpdateCourseContentComponent {
  courseService=inject(CourseService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  contentId:string='';
  courseId:string=''
  courseContentModel:CourseContentResponse=new CourseContentResponse();
  updateCourseContentModel:UpdateCourseContent=new UpdateCourseContent();
  ngOnInit(){
    this.activatedRoute.params.subscribe(paramVal=>{
      this.contentId=paramVal['id'];
      this.courseId=paramVal['courseId']
      this.getCourseContentById()   
    })
  }
  getCourseContentById(){
    this.courseService.getCourseContentById(this.contentId).subscribe(res=>{
      this.courseContentModel=res.result
    })
  }
  updateCourseContent(){
  this.updateCourseContentModel=this.courseContentModel;
  this.updateCourseContentModel.courseId=this.courseId
  this.courseService.updateCourseContent(this.updateCourseContentModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
        this.router.navigate(['/academy/course-content-list',this.courseId])
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
