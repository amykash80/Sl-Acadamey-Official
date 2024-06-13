import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseResponse } from '../../../Models/Academy/Course';
import { CourseResourceResponse } from '../../../Models/CourseResource/CourseResource';
import { CourseService } from '../../../Services/course.service';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-course-resource',
  templateUrl: './course-resource.component.html',
  styleUrl: './course-resource.component.css'
})
export class CourseResourceComponent {
  constructor(
    private router: Router
  ) {}
  activatedRoute=inject(ActivatedRoute);
  courseResourceService=inject(CourseresourceService);
  courseService=inject(CourseService)
  sharedService=inject(SharedService)
  courseId:string=''
  apiBaseUrl: string = 'http://localhost:5232';
  courseResourceList:CourseResourceResponse[]=[];
  filteredResourceList: CourseResourceResponse[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedResourceList: CourseResourceResponse[] = [];
  showSpinner=true;
  showTable=false;
  courseRes: CourseResponse = new CourseResponse();
  showNoContent = false;
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.courseId=paramVal['id']
  this.loadAllCourseResource();
  this.getcourseById()
  
  
  })
}
getcourseById(){
  this.courseService.getCourseById(this.courseId).subscribe(data =>{
   console.log(data)
   this.courseRes=data.result
  })
  }
  loadAllCourseResource() {
    this.courseResourceService.getCourseResourceByCourseId(this.courseId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.courseResourceList = response.result;
          this.filteredResourceList = this.courseResourceList;
          this.totalItems = this.filteredResourceList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          } else {
            this.showNoContent = true;
          }
          console.log(this.courseResourceList);
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/student/check-my-courses']);
          }, 2000);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      },
    });
  }
  

filterResources(): void {
  if (!this.searchText.trim()) {
    this.filteredResourceList = this.courseResourceList.slice();
  } else {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredResourceList = this.courseResourceList.filter(
      (resource) =>
        resource.name!.toLowerCase().startsWith(searchTerm) ||
        resource.description!.toLowerCase().startsWith(searchTerm)
    );
  }

  // Reset pagination to the first page after filtering
  this.totalItems = this.filteredResourceList.length;
  this.currentPage = 1;
  this.updatePagination();
}



updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
  this.displayedResourceList = this.filteredResourceList.slice(startIndex, endIndex);
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


}
