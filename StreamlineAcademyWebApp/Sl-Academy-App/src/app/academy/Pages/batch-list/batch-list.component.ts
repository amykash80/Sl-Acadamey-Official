import { Component } from '@angular/core';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { BatchService } from '../../../Services/batch.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.css',
})
export class BatchListComponent {
  constructor(
    private batchService: BatchService,
    private activatedRoute: ActivatedRoute
  ) {}
  courseId:string=''
  batchList: BatchResponseModel[] = [];
  ngOnInit() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.courseId = paramVal['courseId'];
      console.log(this.courseId)   
    });
    this.loadAllBatches();
  }
  loadAllBatches() {
    this.batchService.getAllBatchesByCourseId(this.courseId).subscribe({
      next: (response) => {
        this.batchList = response.result;
        console.log(this.batchList);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message);
        }
      },
    });
  }
  deleteBatch(id: any) {}
}
