import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchscheduleService } from '../../../Services/batchschedule.service';
import { SharedService } from '../../../Services/shared.service';
import { BatchScheduleResponseModel } from '../../../Models/BatchSchedule/BatchSchedule';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-batch-schedule-list',
  templateUrl: './batch-schedule-list.component.html',
  styleUrl: './batch-schedule-list.component.css'
})
export class BatchScheduleListComponent {
  activatedRoute=inject(ActivatedRoute);
  batchScheduleService=inject(BatchscheduleService);
  sharedService=inject(SharedService)
  batchId:string=''
  courseId:string=''
  batchScheduleList:BatchScheduleResponseModel[]=[];
ngOnInit(){
  this.activatedRoute.params.subscribe(paramVal=>{
  this.batchId=paramVal['id']
  this.courseId=paramVal['courseId']
  this.loadAllBatchSchedules(); 
  })
}
loadAllBatchSchedules(){
  this.batchScheduleService.getAllSchedulesByBatchId(this.batchId).subscribe({
    next: (response) => {
      this.batchScheduleList = response.result;
      console.log(this.batchScheduleList)
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  });
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

