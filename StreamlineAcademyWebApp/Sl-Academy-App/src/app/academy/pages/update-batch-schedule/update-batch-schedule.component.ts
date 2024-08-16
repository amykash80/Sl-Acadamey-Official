import { Component, inject } from '@angular/core';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchScheduleResponseModel, UpdateBatchScheduleModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-update-batch-schedule',
  templateUrl: './update-batch-schedule.component.html',
  styleUrl: './update-batch-schedule.component.css'
})

export class UpdateBatchScheduleComponent {
  batchScheduleService=inject(BatchscheduleService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  batchScheduleId:string='';
  batchId:string=''
  courseId:string=''
  contentName:string=''
  contents: any[] = [];
  batchScheduleModel:BatchScheduleResponseModel=new BatchScheduleResponseModel();
  updateBatchScheduleModel:UpdateBatchScheduleModel=new UpdateBatchScheduleModel();
  loadSpinner: boolean = false;
  ngOnInit(){
    this.activatedRoute.params.subscribe(paramVal=>{
      this.batchScheduleId=paramVal['id'];
      this.courseId=paramVal['courseId'];
      this.batchId=paramVal['batchId'];
    })
    this.getAllContents();
    this.getBatchScheduleById()   

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
      this.contentName=res.result.contentName!;
      console.log(res.result.batchName)
      console.log("inside console",this.contentName);
      this.batchScheduleModel.date = this.formatDateToISOStringDateOnly(this.batchScheduleModel.date);
    });
  }
  formatDateToISOStringDateOnly(date: string | Date | undefined): string {
    if (!date) return '';
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().substring(0, 10); 
  }
  updateBatchSchedule(){
    this.loadSpinner = true;
    this.updateBatchScheduleModel =this.batchScheduleModel;
    this.batchScheduleModel.batchId=this.batchId;
    console.log('Updating with model:', this.updateBatchScheduleModel);
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
    error:(err:HttpErrorResponse)=>{
      if(err.status==HttpStatusCode.Forbidden)
      {
        this.loadSpinner = false;
        this.sharedService.showErrorToast(err.message)
      }
      else{
        this.loadSpinner=false;
        this.sharedService.showErrorToast("something went wrong,try again later..")
      }
    }
    
  })
  }
}
