import { Component, inject } from '@angular/core';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchScheduleRequestModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateCourse } from '../../../Models/Academy/Course';

@Component({
  selector: 'app-create-batch-schedule',
  templateUrl: './create-batch-schedule.component.html',
  styleUrl: './create-batch-schedule.component.css'
})

export class CreateBatchScheduleComponent {
  batchScheduleService=inject(BatchscheduleService)
  sharedService=inject(SharedService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  batchScheduleModel:BatchScheduleRequestModel=new BatchScheduleRequestModel();
  batches:BatchResponseModel[]=[];
  batchId:string=''
  courseId:string=''
  contents: any[] = [];

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
createBatchSchedule(){
  this.batchScheduleModel.batchId=this.batchId;
  this.batchScheduleService.createBatchSchedule(this.batchScheduleModel).subscribe({
    next: (response) => {
      console.log(response)
      if (response.isSuccess) {
        this.sharedService.showSuccessToast(response.message);
        this.router.navigate(['/academy/batch-schedule-list',this.batchId,this.courseId])
      }
      else{
        this.sharedService.showErrorToast(response.message)
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.BadRequest) {
        console.log(err.message)
      }
    }
  });
}

}