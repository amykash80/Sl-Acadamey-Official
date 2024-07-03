import { Component } from '@angular/core';
import { AttendanceResponseModel, SaveAttendence } from '../../../Models/student/students';
import { StudentService } from '../../../Services/student.service';
import { ApiResponse } from '../../../Models/Common/api-response';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { CourseResponse } from '../../../Models/Academy/Course';
import { AttendenceStatus } from '../../../Enums/AttendenceStatus';

@Component({
  selector: 'app-my-attendances',
  templateUrl: './my-attendances.component.html',
  styleUrl: './my-attendances.component.css'
})
export class MyAttendancesComponent {
  attendances: AttendanceResponseModel[] = [];
  filteredAttendanceList: AttendanceResponseModel[] = [];
  displayedBatchList: AttendanceResponseModel[] = [];
  schedulelist: AttendanceResponseModel[] = [];
  showSpinner: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  showTable=false
  searchText: string = ''; 
  scheduleName:string=''
 
  constructor(private studentService:StudentService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAttendances();
  }
  getAttendanceStatusClass(statuses: AttendenceStatus[]): string {
    
    if (!statuses || statuses.length === 0) {
      return ''; 
    }

    switch (statuses[0]) {
      case AttendenceStatus.Present:
        return 'chip chip-success';
      case AttendenceStatus.Absent:
        return 'chip chip-danger';
      case AttendenceStatus.Late:
        return 'chip chip-warning';
        case AttendenceStatus.Excused:
         return 'chip chip-excused';
        
      default:
        return 'chip'; 
    }
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedBatchList = this.filteredAttendanceList.slice(
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

  filterSchedules(): void {
    if (!this.searchText.trim()) {
      this.filteredAttendanceList = this.schedulelist.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredAttendanceList = this.attendances.filter(attendance =>
        attendance.attendenceStatus?.some(status =>
          status.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
    this.totalItems = this.filteredAttendanceList.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  fetchAttendances(): void {
    this.studentService.getAttendances().subscribe(
      (response: ApiResponse<SaveAttendence[]>) => {
        if (response.isSuccess) {
        this.showSpinner = false;
        this.showTable=true
          this.attendances = response.result;
          console.log(this.attendances)
          this.schedulelist = response.result;
          this.filteredAttendanceList = this.schedulelist;
          this.totalItems = this.filteredAttendanceList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
          }
        } else {
          this.sharedService.showErrorToast(response.message);
          this.router.navigate(['/student/dashboard'])

        }
      },
      (error) => {
        console.error('Error fetching attendance records:', error);
        // Handle error case if needed
      }
    );
  }

}

