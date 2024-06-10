import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { BatchScheduleResponseModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { BatchService } from '../../../Services/batch.service';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { CourseService } from '../../../Services/course.service';
import { CourseResponse } from '../../../Models/Academy/Course';

@Component({
  selector: 'app-batch-schedule-list',
  templateUrl: './batch-schedule-list.component.html',
  styleUrl: './batch-schedule-list.component.css'
})

export class BatchScheduleListComponent {
  constructor(
    private router: Router
  ) {}
    
  activatedRoute=inject(ActivatedRoute);
  batchScheduleService=inject(BatchscheduleService);
  batchService=inject(BatchService)
  courseService=inject(CourseService)
  sharedService=inject(SharedService)
  batchId:string=''
  courseId:string=''
  batchScheduleList:BatchScheduleResponseModel[]=[];
  filterBatchSchedules: BatchScheduleResponseModel[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  showSpinner=true
  showTable=false
  showNoContent = false;
  flag: string = '';
  displayedBatchScheduleList: BatchScheduleResponseModel[] = [];
  courseRes:BatchResponseModel=new BatchResponseModel()
  courseResponse:CourseResponse=new CourseResponse()


ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.batchId=paramVal['id']
  this.courseId=paramVal['courseId']
  this.loadAllBatchSchedules(); 
  this.getBatchById()
  this.getCourseById()
  })
}
getBatchById(){
  this.batchService.getBatchById(this.batchId).subscribe(data =>{
   this.courseRes=data.result
   console.log(this.courseRes)
  })
  }
  getCourseById(){
    this.courseService.getCourseById(this.courseId).subscribe(data =>{
     this.courseResponse=data.result
     console.log(this.courseResponse)
    })
    }
filterBatchSchedule(): void {
  if (!this.searchText.trim()) {
    this.filterBatchSchedules = this.batchScheduleList.slice();
  } else {
    const searchTerm = this.searchText.toLowerCase();
    this.filterBatchSchedules = this.batchScheduleList.filter(
      (schedule) =>
        schedule.contentName!.toLowerCase().startsWith(searchTerm) ||
        schedule.date!.toLowerCase().startsWith(searchTerm)
    );
  }
  this.totalItems = this.filterBatchSchedules.length;
  this.currentPage = 1;
  this.updatePagination();
}

loadAllBatchSchedules(){
  
  this.batchScheduleService.getAllSchedulesByBatchId(this.batchId).subscribe({
    next: (response) => {
      if(response.isSuccess){
      this.showSpinner=false;
      this.showTable=true
      this.batchScheduleList = response.result;
      this.filterBatchSchedules=this.batchScheduleList;
      this.totalItems = this.filterBatchSchedules.length;
      this.currentPage = 1; 
      this.updatePagination();
      if (response.result.length > 0) {
        this.showTable = true;
        this.showNoContent = false;
      }}else {
        this.sharedService.NoDataSwal(response.message);
        setTimeout(()=>{
          this.router.navigate(['/academy/course-list'])

        },2000)
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
}

updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
  this.displayedBatchScheduleList = this.filterBatchSchedules.slice(startIndex, endIndex);
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

deleteBatchSchedule(batchScheduleId: any) {
  this.sharedService
    .fireConfirmSwal('Are You sure you want to delete this Content ')
    .then((result:any) => {
      if (result.isConfirmed) {
        this.batchScheduleService.deleteBatchSchedule(batchScheduleId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.showSuccessToast(response.message);
              this.loadAllBatchSchedules();
            } else {
              this.sharedService.showErrorToast(response.message);
            }
          },
        });
      }
    });
}

}