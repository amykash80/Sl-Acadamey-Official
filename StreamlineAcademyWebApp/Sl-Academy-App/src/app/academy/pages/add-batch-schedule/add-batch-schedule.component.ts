import { Component, inject } from '@angular/core';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchScheduleRequestModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-add-batch-schedule',
  templateUrl: './add-batch-schedule.component.html',
  styleUrl: './add-batch-schedule.component.css'
})

export class AddBatchScheduleComponent {
  batchScheduleService=inject(BatchscheduleService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  batchScheduleModel:BatchScheduleRequestModel=new BatchScheduleRequestModel();
  batches:BatchResponseModel[]=[];
  batchId:string=''
  courseId:string=''
  contents: any[] = [];
  loadSpinner: boolean = false;

ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
    this.batchId=paramVal['id'];
    this.courseId=paramVal['cId']
    
  })
  this.getAllContents();

}
getAllContents() {
  this.batchScheduleService.getContents(this.courseId).subscribe((contents) => {
    this.contents = contents.result;
    console.log(this.contents);
  
  });
}
addBatchSchedule(){
  this.loadSpinner = true;
  this.batchScheduleModel.batchId=this.batchId;
  this.batchScheduleService.createBatchSchedule(this.batchScheduleModel).subscribe({
    next: (response) => {
      console.log(response)
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.loadSpinner = false;
        this.router.navigate(['/academy/batch-schedule-list',this.batchId,this.courseId])
      }
      else{
        this.sharedService.showErrorToast(response.message)
        this.loadSpinner = false;
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.BadRequest) {
        console.log(err.message)
        this.loadSpinner = false;
      }
    }
  });
}

}