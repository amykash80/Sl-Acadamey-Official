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
  sharedService=inject(SharedService);
  courseId:string=''
  showSpinner=true;
  showTable=false;
  courseContentList:CourseContentResponse[]=[];
  filteredContentList: CourseContentResponse[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayecontentList: CourseContentResponse[] = [];
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.courseId=paramVal['id']
  this.loadAllCourseContents();
  
  })
}
loadAllCourseContents(){
  this.courseService.getCourseContentsByCourseId(this.courseId).subscribe({
    next: (response) => {
      this.showSpinner=false;
      this.showTable=true
      this.courseContentList = response.result;
      this.filteredContentList = this.courseContentList;
      this.totalItems = this.courseContentList.length;
      this.currentPage = 1; 
      this.updatePagination();
      console.log(this.courseContentList)
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}
filterContents(): void {
  if (!this.searchText.trim()) {
    this.filteredContentList = this.courseContentList.slice();
  } else {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredContentList = this.courseContentList.filter(
      (content) =>
        content.taskName!.toLowerCase().startsWith(searchTerm) ||
        content.description!.toLowerCase().startsWith(searchTerm) ||
        content.duration!.toString().toLowerCase().startsWith(searchTerm)
    );
  }
  this.totalItems = this.filteredContentList.length;
  this.currentPage = 1;
  this.updatePagination();
}

updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
  this.displayecontentList = this.filteredContentList.slice(startIndex, endIndex);
  this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

goToPage(page: number): void {
  if (page < 1 || page > this.pages.length) {
    return;
  }
  this.currentPage = page;
  this.updatePagination();
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
