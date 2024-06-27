import { Component } from '@angular/core';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseResourceResponse, UpdateCourseResource } from '../../../Models/CourseResource/CourseResource';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-corse-resource',
  templateUrl: './update-corse-resource.component.html',
  styleUrl: './update-corse-resource.component.css',
})
export class UpdateCorseResourceComponent {
  resourceId: string = '';
  courseId: string = '';
  dropDownValue:number=0
  resourceModel:CourseResourceResponse=new CourseResourceResponse();
  updateResouceModel:UpdateCourseResource=new UpdateCourseResource();
  selectedFile: File | null = null;
  constructor(
    private courseResourseService: CourseresourceService,
    private route: ActivatedRoute,
    private sharedServcice:SharedService,
    private router:Router
  ) {
    this.route.params.subscribe((params) => {
      this.resourceId = params['resourceId'];
      this.courseId=params['courseId']
    });
  }
  ngOnInit(): void {
    this.getCourseResourceById();
  }
  getCourseResourceById() {
    this.courseResourseService
      .getCourseResourceById(this.resourceId)
      .subscribe({
        next: (response) => {
          this.resourceModel=response.result
          console.log(this.resourceModel);
          
        },
      });
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  updateCourseResource(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    if (this.resourceModel.name) {
      formData.append('name', this.resourceModel.name);
    }
    if (this.resourceModel.description) {
      formData.append('description', this.resourceModel.description);
    }
    if (this.resourceModel.type !== undefined) {
      formData.append('type', this.resourceModel.type.toString());
    }
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('CourseId', this.courseId);
    formData.append('Id', this.resourceId);

    this.courseResourseService.updateCourseResource(formData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedServcice.showSuccessToast(response.message);
          this.router.navigate(['/academy/course-resource-list', this.courseId]);
        } else {
          this.sharedServcice.showErrorToast(response.message);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
//   updateCourseResource(event: Event) {
//   let myForm=event.target as HTMLFormElement
//    const formData=new FormData(myForm);
//    formData.append("CourseId",this.courseId);
//    formData.append("Id",this.resourceId);
//    this.courseResourseService.updateCourseResource(formData).subscribe({
//     next:(response)=>{
//       if(response.isSuccess){
//         this.sharedServcice.showSuccessToast(response.message);
//         this.router.navigate(['/academy/course-resource-list',this.courseId])
//       }
//       else{
//         this.sharedServcice.showErrorToast(response.message)
//       }
//     },
//     error:(err)=>{
//       console.log(err)
//     }
//    })
//   }
// }
