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
  totalItems = 0;
  currentPage = 1;
  displayedScheduleList:BatchScheduleResponseModel[] = [];
  constructor(
    private instructorService: InstructorService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllSchedules();
  }

  getAllSchedules(): void {
    this.instructorService.checkMySchedule().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.loadSpinner = false;
          this.showTable = true;
          this.scheduleList = response.result;
          this.filteredList = this.scheduleList;
          this.totalItems = this.filteredList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
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

  updatePagination(): void {
    // Implement pagination logic if necessary
  }
}

