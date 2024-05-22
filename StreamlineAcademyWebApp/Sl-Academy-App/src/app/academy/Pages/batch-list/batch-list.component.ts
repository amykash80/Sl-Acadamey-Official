import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../Services/batch.service';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.css'
})
export class BatchListComponent {
  courseId!: string
  batchList:BatchResponseModel[]=[]
constructor(private activatedRoute: ActivatedRoute,
           private batchService: BatchService,
          private sharedService:SharedService){
  this.activatedRoute.params.subscribe((paramVal) => {
    this.courseId = paramVal['courseId'];
  });
}
ngOnInit(){
  this.getAllBatchesByCourseId();
}
getAllBatchesByCourseId(){
  this.batchService.getAllBatchesByCourseId(this.courseId).subscribe({
    next: (response) => {
      this.batchList = response.result;
      console.log(this.batchList);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
}
deleteBatch(batchId:any){
  this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Batch ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.batchService.deleteBatch(batchId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.getAllBatchesByCourseId();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
}
}
