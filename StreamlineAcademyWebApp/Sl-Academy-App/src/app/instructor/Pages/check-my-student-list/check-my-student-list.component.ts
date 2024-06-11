import { Component } from '@angular/core';
import { StudentResponseModel } from '../../../Models/student/students';
import { InstructorService } from '../../../Services/instructor.service';
import { ApiResponse } from '../../../Models/Common/api-response';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-my-student-list',
  templateUrl: './check-my-student-list.component.html',
  styleUrl: './check-my-student-list.component.css',
})
export class CheckMyStudentListComponent {
  studentList: StudentResponseModel[] = [];
  filteredList: StudentResponseModel[] = [];
  searchText: string = '';
  showNoContent = false;
  showTable = false;
  showSpinner = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  loggedInUserDetails: any;
  instructorId: string = '';
  pages: number[] = [];
  displayedStudentList: StudentResponseModel[] = [];
  errorMessage: string | null = null;

  constructor(
    private instructorService: InstructorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.instructorId = this.loggedInUserDetails.userId;
    this.loadStudents();
  }
  filterStudents(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredList = this.studentList.filter((course) =>
      course.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredList);
    this.totalItems = this.filteredList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedStudentList = this.filteredList.slice(startIndex, endIndex);
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
  loadStudents(): void {
    this.instructorService
      .checkMyAllBatchesStudents(this.instructorId)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.showSpinner = false;
          this.showTable = true;
          this.studentList = response.result;
          this.filteredList = this.studentList;
          this.totalItems = this.filteredList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
          } else {
            this.showNoContent = true;
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while fetching students';
          console.error(err);
        },
      });
  }
}
