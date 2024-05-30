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
  apiBaseUrl: string = 'http://localhost:5232';
  courseResourceList:CourseResourceResponse[]=[];
  filteredResourceList: CourseResourceResponse[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedResourceList: CourseResourceResponse[] = [];
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
      this.totalItems = this.filteredResourceList.length;
      this.currentPage = 1; 
      this.updatePagination();
      console.log(this.courseResourceList)
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}

filterBatches(): void {
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
