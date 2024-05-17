import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResource, CourseResourceResponse } from '../../../Models/CourseResource/CourseResource';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CourseResourceType } from '../../../Enums/courseresourcetype';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-course-resource',
  templateUrl: './create-course-resource.component.html',
  styleUrl: './create-course-resource.component.css'
})
export class CreateCourseResourceComponent {
  courseResourceService=inject(CourseresourceService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)

courseResourceModel:CourseResource=new CourseResource();
courses:CourseResourceResponse[]=[];
courseId:string=''
selectedFile: File | undefined;
resourceTypes: CourseResourceType[] = Object.values(CourseResourceType)
.filter(value => typeof value === 'number') as CourseResourceType[];

getTypeName(type: CourseResourceType): string {
  return CourseResourceType[type];
}
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
    this.courseId=paramVal['id'];
  })
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile = file;
  console.log('Selected file:', this.selectedFile);
  
}

createCourseResource(event:any){
  this.courseResourceModel.CourseId=this.courseId;
  const formData = new FormData(event.target.value as HTMLFormElement);
  formData.append('CourseId', this.courseId);
  if (this.courseResourceModel.Name !== undefined) {
    formData.append('Name', this.courseResourceModel.Name); // Add Name field
  }
  if (this.courseResourceModel.Description !== undefined) {
    formData.append('Description', this.courseResourceModel.Description); // Add Name field
  }
  if (this.courseResourceModel.Type !== undefined) {
    formData.append('Type', this.courseResourceModel.Type.toString()); // Add Type field
  }
  this.courseResourceService.createCourceResource(formData).subscribe({
    next: (response) => {
      console.log(response)
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.router.navigate(['/academy/course-list'])
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