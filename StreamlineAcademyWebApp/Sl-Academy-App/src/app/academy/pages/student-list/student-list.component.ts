import { Component } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { SharedService } from '../../../Services/shared.service';
import { StudentResponseModel } from '../../../Models/student/students';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AssignStudent } from '../../../Models/Batch/Batch';
import { BatchService } from '../../../Services/batch.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  constructor(
    private studentService: StudentService,
    private sharedService: SharedService,
    private batchService: BatchService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((val) => {
      this.batchId = val['batchId'];
    });
    this.loadAllStudents();

  }
  studentList: StudentResponseModel[] = [];
  filteredStudentList: StudentResponseModel[] = [];
  studentBatchAssignmentModel: AssignStudent = new AssignStudent();
  searchText: string = '';
  batchId: string = '';
  showStdList = false;
  showSpinner=true;
  showTable=false;
  showNoContent = false;
  showAssignList = true;
  filteredStudentBatchList: any;
  studentListByBatch: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedStudentList: StudentResponseModel[] = [];

  
  loadAllStudents() {
    this.studentService.studentList().subscribe({
      next: (response) => {
        console.log(response);
        if (response.result.length > 0) {
          this.studentList = response.result;
          this.filteredStudentList = this.studentList;
          this.totalItems = this.filteredStudentList.length;
          this.currentPage = 1; 
          this.updatePagination();
          this.showStdList = true;
          this.showSpinner=false
          this.showTable=true;

          this.showNoContent = false;
        } else if (response.result.length == 0) {
          this.showStdList = false;
          this.showNoContent = true;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }
  filterStudents(): void {
    if (!this.searchText.trim()) {
      this.filteredStudentList = this.studentList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredStudentList = this.studentList.filter(
        (student) =>
          student.name!.toLowerCase().startsWith(searchTerm) ||
          student.address!.toLowerCase().startsWith(searchTerm) ||
          student.email!.toLowerCase().startsWith(searchTerm) ||
          student.phoneNumber!.toString().toLowerCase().startsWith(searchTerm)
      );
    }
  
    // Reset pagination to the first page after filtering
    this.totalItems = this.filteredStudentList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  
  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedStudentList = this.filteredStudentList.slice(startIndex, endIndex);
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
  deleteStudent(studentId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Student ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.studentService.deleteStudent(studentId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllStudents();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}
