import { Component } from '@angular/core';
import { CourseResponse } from '../../../Models/Academy/Course';
import { StudentService } from '../../../Services/student.service';
import { SharedService } from '../../../Services/shared.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-check-my-courses',
  templateUrl: './check-my-courses.component.html',
  styleUrl: './check-my-courses.component.css'
})
export class CheckMyCoursesComponent {
  courses: CourseResponse[] = [];
  filteredCourses: CourseResponse[] = [];
  searchText = '';
  showNoContent = false;
  showTable = false;
  showSpinner = true;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  pages: number[] = [];
  displayedCourses: CourseResponse[] = [];

  constructor(
    private studentService: StudentService,
    private sharedService: SharedService ,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadAllCourses();
  }

  loadAllCourses(): void {
    this.studentService.checkMyCourses().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.courses = response.result;
          this.filteredCourses = this.courses;
          this.totalItems = this.filteredCourses.length;
          this.currentPage = 1;
          this.updatePagination();
          if (this.courses.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          } else {
            this.showNoContent = true;
          }
        } else {
          this.showSpinner = false; 
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/student/dashboard']);
          }, 2000);
        }
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        // Handle error scenario
        this.showSpinner = false; // Added to handle error case
      }
    });
  }


  filterCourses(): void {
    if (!this.searchText.trim()) {
      this.filteredCourses = this.courses.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.name && course.name.toLowerCase().startsWith(searchTerm)
      );
    }
    this.totalItems = this.filteredCourses.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedCourses = this.filteredCourses.slice(startIndex, endIndex);
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