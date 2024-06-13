import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import {
  CourseResource,
  CourseResourceResponse,
} from '../../../Models/CourseResource/CourseResource';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CourseResourceType } from '../../../Enums/courseresourcetype';
import { NgForm } from '@angular/forms';
import { CourseResponse } from '../../../Models/Academy/Course';

@Component({
  selector: 'app-create-course-resource',
  templateUrl: './create-course-resource.component.html',
  styleUrl: './create-course-resource.component.css',
})
export class CreateCourseResourceComponent {
  courseResourceService = inject(CourseresourceService);
  sharedService = inject(SharedService);
  courseService=inject(CourseService)
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  courseResourceModel: CourseResource = new CourseResource();
  courses: CourseResourceResponse[] = [];
  courseId: string = '';
  courseRes:CourseResponse=new CourseResponse()
  loadSpinner=true
  type!:CourseResourceType


  ngOnInit() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.courseId = paramVal['id'];
      this.getcourseById()
      console.log(this.courseId)
    });
  }
  getDropdownValue(event:any){
  this.type=event.target.value;
  console.log(this.type)
  }
  getcourseById(){
    this.courseService.getCourseById(this.courseId).subscribe(data =>{
     this.courseRes=data.result
    })
    }
  createCourseResource(event: Event) {
    this.courseResourceModel.CourseId = this.courseId;
    let myForm = event.target as HTMLFormElement;
    console.log(myForm)
    let formData = new FormData(myForm);
    formData.append('CourseId', this.courseId);
    this.courseResourceService
      .createCourceResource(formData)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.loadSpinner=false
          this.sharedService.showSuccessToast(res.message);
          this.router.navigate(['/academy/course-resource-list',this.courseId])
        }
        else{
          this.loadSpinner=false
          this.sharedService.showErrorToast(res.message)
        }
      });
  }
}
