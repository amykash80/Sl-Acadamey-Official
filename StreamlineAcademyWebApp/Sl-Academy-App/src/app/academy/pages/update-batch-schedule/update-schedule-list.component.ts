import { Component, inject } from '@angular/core';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchScheduleResponseModel, UpdateBatchScheduleModel } from '../../../Models/BatchSchedule/BatchSchedule';

@Component({
  selector: 'app-update-schedule-list',
  templateUrl: './update-schedule-list.component.html',
  styleUrl: './update-schedule-list.component.css'
})

export class UpdateScheduleListComponent {
  batchScheduleService=inject(BatchscheduleService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  batchScheduleId:string='';
  batchId:string=''
  courseId:string=''
  contents: any[] = [];
  batchScheduleModel:BatchScheduleResponseModel=new BatchScheduleResponseModel();
  updateBatchScheduleModel:UpdateBatchScheduleModel=new UpdateBatchScheduleModel();
  loadSpinner: boolean = false;
  ngOnInit(){
    this.activatedRoute.params.subscribe(paramVal=>{
      this.batchScheduleId=paramVal['id'];
      this.courseId=paramVal['courseId'];
      this.batchId=paramVal['batchId'];
      this.getBatchScheduleById()   
    })
    this.getAllContents();
  }
  getAllContents() {
    this.batchScheduleService.getContents(this.courseId).subscribe((contents) => {
      this.contents = contents.result;
      console.log(this.contents);
    
    });
  }
  getBatchScheduleById(){
    this.batchScheduleService.getBatchScheduleById(this.batchScheduleId).subscribe(res => {
      this.batchScheduleModel = res.result;
      console.log(this.batchScheduleModel);
      this.batchScheduleModel.date = this.formatDateToISOStringDateOnly(this.batchScheduleModel.date);
    });
  }
  formatDateToISOStringDateOnly(date: string | Date | undefined): string {
    if (!date) return '';
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().substring(0, 10); // yyyy-MM-dd format
  }
  updateBatchSchedule(){
    this.loadSpinner = true;
    this.updateBatchScheduleModel =this.batchScheduleModel;
    this.batchScheduleModel.batchId=this.batchId;
    this.batchScheduleService.updateBatchSchedule(this.updateBatchScheduleModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
        this.loadSpinner = false;
        this.router.navigate(['/academy/batch-schedule-list', this.batchId, this.courseId]);
      }
      else{
        this.sharedService.showErrorToast(response.message)
        this.loadSpinner = false;
      }
    },
    error:(err)=>{
      console.log(err)
      this.loadSpinner = false;
    }
  })
  }
}