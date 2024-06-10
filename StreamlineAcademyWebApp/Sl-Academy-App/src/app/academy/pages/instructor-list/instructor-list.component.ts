import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { SharedService } from '../../../Services/shared.service';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrl: './instructor-list.component.css'
})

export class InstructorListComponent {
  constructor(
    private instructorService: InstructorService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.loadAllInstructors();
  }
  instructorList: InstructorResponseModel[] = [];
  searchText=''
  showSpinner=true;
  showTable=false;
  filteredInstructorList: InstructorResponseModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedInstructorList: InstructorResponseModel[] = [];
  showNoContent = false;
  filterInstructors(): void {
    if (!this.searchText.trim()) {
      this.filteredInstructorList = this.instructorList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredInstructorList = this.instructorList.filter(
        (instructor) =>
          instructor.name!.toLowerCase().startsWith(searchTerm) ||
        instructor.address!.toLowerCase().startsWith(searchTerm) ||
        instructor.email!.toLowerCase().startsWith(searchTerm) ||
        instructor.phoneNumber!.toString().toLowerCase().startsWith(searchTerm)
      );
    }
  
    // Reset pagination to the first page after filtering
    this.totalItems = this.filteredInstructorList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedInstructorList = this.filteredInstructorList.slice(startIndex, endIndex);
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
  
  loadAllInstructors() {
    this.instructorService.instructorList().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.instructorList = response.result;
          this.filteredInstructorList = this.instructorList;
          this.totalItems = this.filteredInstructorList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          } else {
            this.showNoContent = true;
          }
          console.log(this.instructorList);
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/academy/dashboard']);
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
  

  deleteInstructor(instructorId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Academy ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.instructorService.deleteInstructor(instructorId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllInstructors();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}
