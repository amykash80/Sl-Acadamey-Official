import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResourceResponse } from '../../../Models/CourseResource/CourseResource';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-course-resource-list',
  templateUrl: './course-resource-list.component.html',
  styleUrl: './course-resource-list.component.css'
})
export class CourseResourceListComponent {
  activatedRoute=inject(ActivatedRoute);
  courseResourceService=inject(CourseresourceService);
  sharedService=inject(SharedService)
  courseId:string=''
  courseResourceList:CourseResourceResponse[]=[];
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.courseId=paramVal['id']
  this.loadAllCourseResource();
  
  })
}
loadAllCourseResource(){
  this.courseResourceService.getCourseResourceByCourseId(this.courseId).subscribe({
    next: (response) => {
      this.courseResourceList = response.result;
      console.log(this.courseResourceList)
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}
deleteCourseResource(courseResourceId: any) {
  this.sharedService
    .fireConfirmSwal('Are You sure you want to delete this Resource ')
    .then((result:any) => {
      if (result.isConfirmed) {
        this.courseResourceService.deleteCourseResource(courseResourceId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.showSuccessToast(response.message);
              this.loadAllCourseResource();
            } else {
              this.sharedService.showErrorToast(response.message);
            }
          },
        });
      }
    });
}
}
