import { Component } from '@angular/core';
import { BatchScheduleResponseModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { InstructorService } from '../../../Services/instructor.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-my-schedule',
  templateUrl: './check-my-schedule.component.html',
  styleUrl: './check-my-schedule.component.css'
})
export class CheckMyScheduleComponent {
  loadSpinner = true;
  showTable = false;
  scheduleList: BatchScheduleResponseModel[] = [];
  filteredList: BatchScheduleResponseModel[] = [];
  searchText: string = '';
  showNoContent = false;
  showSpinner = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedScheduleList: BatchScheduleResponseModel[] = [];
  loggedInUserDetails: any;
  instructorId: string = '';

  constructor(
    private instructorService: InstructorService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.instructorId = this.loggedInUserDetails.userId;
    this.getAllSchedules();
  }

  getAllSchedules(): void {
    this.instructorService.checkMySchedule().subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.scheduleList = response.result;
          this.filteredList = this.scheduleList;
          this.totalItems = this.filteredList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          }
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/instructor/dashboard']);
          }, 2000);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterSchedules(): void {
    if (!this.searchText.trim()) {
      this.filteredList = this.scheduleList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredList = this.scheduleList.filter(
        (schedule) =>
          schedule.batchName!.toLowerCase().startsWith(searchTerm) ||
          schedule.durationInHours!.toString().toLowerCase().startsWith(searchTerm)
      );
    }

    this.totalItems = this.filteredList.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedScheduleList = this.filteredList.slice(startIndex, endIndex);
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

