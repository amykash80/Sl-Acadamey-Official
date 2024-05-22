import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Services/course.service';
import { CourseContentResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-course-content-list',
  templateUrl: './course-content-list.component.html',
  styleUrl: './course-content-list.component.css'
})
export class CourseContentListComponent {
  activatedRoute=inject(ActivatedRoute);
  courseService=inject(CourseService);
  sharedService=inject(SharedService)
  courseId:string=''
  courseContentList:CourseContentResponse[]=[];
  filteredCourseContentList: CourseContentResponse[] = [];
  searchText: string = '';
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.courseId=paramVal['id']
  this.loadAllCourseContents();
  
  })
  
}

filterCourseContent(): void {
  if (!this.searchText.trim()) {
    this.filteredCourseContentList = this.courseContentList.slice();
    return;
  }

  const searchTerm = this.searchText.toLowerCase();
  this.filteredCourseContentList = this.courseContentList.filter(
    (courseContent) =>
      courseContent.taskName!.toLowerCase().startsWith(searchTerm) ||
      courseContent.description!.toLowerCase().startsWith(searchTerm) 
  );
}

loadAllCourseContents(){
  this.courseService.getCourseContentsByCourseId(this.courseId).subscribe({
    next: (response) => {
      this.courseContentList = response.result;
      this.filteredCourseContentList = this.courseContentList;
      console.log(this.courseContentList)
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}
deleteCourseContent(courseContentId: any) {
  this.sharedService
    .fireConfirmSwal('Are You sure you want to delete this Content ')
    .then((result:any) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseContent(courseContentId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.showSuccessToast(response.message);
              this.loadAllCourseContents();
            } else {
              this.sharedService.showErrorToast(response.message);
            }
          },
        });
      }
    });
}
}
