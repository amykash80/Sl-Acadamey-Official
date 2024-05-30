import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
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
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = 0;
  pages: number[] = [];
  displayedCourseList: CourseResponse[] = [];
  ngOnInit() {
    this.loadAllCourse();
  }

  
  loadAllCourse() {
    this.courseServices.courseList().subscribe({
      next: (response) => {
        this.courseList = response.result;
        this.filteredCourseList=this.courseList;
        this.totalItems = this.filteredCourseList.length;
      this.currentPage = 1; 
      this.updatePagination();
        if(response.result.length>0){
          this.showTable=true;
        }
        else{
          this.showNoContent=true;
          
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
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

  deleteCourse(courseId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Course ')
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