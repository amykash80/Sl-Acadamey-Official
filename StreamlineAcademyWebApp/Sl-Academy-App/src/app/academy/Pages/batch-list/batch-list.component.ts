import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../Services/batch.service';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.css'
})
export class BatchListComponent {
  courseId!: string
  batchList:BatchResponseModel[]=[]
constructor(private activatedRoute: ActivatedRoute,
           private batchService: BatchService){
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
}
