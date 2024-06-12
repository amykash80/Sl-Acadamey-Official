import { Component } from '@angular/core';
import { BatchScheduleResponseModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { StudentService } from '../../../Services/student.service';
import { ApiResponse } from '../../../Models/Common/api-response';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrl: './my-schedules.component.css',
})
export class MySchedulesComponent {
  scheduleList: BatchScheduleResponseModel[] = [];
  filteredScheduleList: BatchScheduleResponseModel[] = [];
  searchText: string = '';
  showNoContent = false;
  showTable = false;
  showSpinner = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedScheduleList: BatchScheduleResponseModel[] = [];
  constructor(
    private studentService: StudentService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  filterSchedules(): void {
    if (!this.searchText.trim()) {
      this.filteredScheduleList = this.scheduleList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredScheduleList = this.scheduleList.filter(
        (schedule) =>
          schedule.batchName!.toLowerCase().startsWith(searchTerm) ||
          schedule.contentName!.toLowerCase().startsWith(searchTerm) ||
          schedule.date!.toLowerCase().startsWith(searchTerm) ||
          schedule
            .durationInHours!.toString()
            .toLowerCase()
            .startsWith(searchTerm)
      );
    }

    this.totalItems = this.filteredScheduleList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedScheduleList = this.filteredScheduleList.slice(
      startIndex,
      endIndex
    );
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
 
  loadSchedules(): void {
    this.studentService.getAllMySchedules().subscribe({
      next: (response) => {
        console.log(response)
        this.showSpinner = false;

        if (response.isSuccess) {
          this.showTable = true;
          this.scheduleList = response.result;
          this.filteredScheduleList = this.scheduleList;
          this.totalItems = this.filteredScheduleList.length;
          this.currentPage = 1;
          this.updatePagination();
        } 
        else{
          this.sharedService.NoDataSwal(response.message)
          this.router.navigate(['/student/dashboard'])
        }
      },
      error: (err: HttpErrorResponse) => {
        this.showSpinner = false;
        if (err.status === HttpStatusCode.Unauthorized) {
          console.log('Unauthorized access:', err.message);
        } else {
          console.error('Error retrieving schedules:', err);
          this.sharedService.NoDataSwal('An error occurred while retrieving schedules.');
        }
      }
    });
  }

}
