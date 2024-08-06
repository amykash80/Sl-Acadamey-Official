import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
 
  constructor(
    private router: Router,
    private courseServices: CourseService,
    private sharedService: SharedService
  ) {}
  courseList: CourseResponse[] = [];
  filteredCourseList:CourseResponse[]=[]
  searchText:string=''
  showNoContent=false;
  showTable=false;
  showSpinner=true;
  userId:any
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedCourseList: CourseResponse[] = [];
  ngOnInit() {
    this.getUserIdFromLocalStorage()
    this.loadAllCourse();
  }

  
  loadAllCourse() {
    console.log(this.userId)
    this.courseServices.courseList(this.userId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.courseList = response.result;
          this.filteredCourseList = this.courseList;
          this.totalItems = this.filteredCourseList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          } else {
            this.showNoContent = true;
          }
        } else {
          this.sharedService.showErrorToast(response.message);
            this.router.navigate(['/academy/dashboard']);
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
  getUserIdFromLocalStorage(): void {
    // Retrieve the object from local storage
    const responseObjStr = localStorage.getItem('responseObj');

    if (responseObjStr) {
      try {
        // Parse the JSON string to an object
        const responseObj = JSON.parse(responseObjStr);

        // Extract userId from the parsed object
        this.userId = responseObj.userId;

        // Use userId as needed
        console.log('User ID:', this.userId);
      } catch (error) {
        console.error('Error parsing local storage object:', error);
      }
    } else {
      console.warn('No responseObj found in local storage.');
    }
  }
 
  filterCourses(event:any){
    const filterValue = event.target.value.toLowerCase();
    this.filteredCourseList = this.courseList.filter(course => 
      course.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredCourseList);
    this.totalItems = this.filteredCourseList.length;
  this.currentPage = 1;
  this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedCourseList = this.filteredCourseList.slice(startIndex, endIndex);
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
showDescription(description:any){
this.sharedService.showDescriptorSwal(description)
}
  deleteCourse(courseId: any) {
    debugger;
    this.sharedService
      .fireConfirmSwal('Are You sure')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.courseServices.deleteCourse(courseId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllCourse();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}