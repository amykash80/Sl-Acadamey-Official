import { Component, inject } from '@angular/core';
import {
  BatchRequestModel,
  BatchResponseModel,
  UpdateBatchModel,
} from '../../../Models/Batch/Batch';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { LocationResponseModel } from '../../../Models/Location/Location';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../../Services/instructor.service';
import { LocationService } from '../../../Services/location.service';
import { BatchService } from '../../../Services/batch.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrl: './update-batch.component.css',
})
export class UpdateBatchComponent {
  activatedRoute = inject(ActivatedRoute);
  instructorService = inject(InstructorService);
  locationService = inject(LocationService);
  batchService = inject(BatchService);
  sharedService = inject(SharedService);
  router = inject(Router);
  batchId: string = '';
  courseId:string=''
  loadSpinner = false;
  updateBatchModel: UpdateBatchModel = new UpdateBatchModel();
  constructor() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.batchId = paramVal['batchId'];
      this.courseId=paramVal['courseId']

      this.batchService.getBatchById(this.batchId).subscribe((batch) => {
        this.batchModel = batch.result;   
        this.batchModel.startDate = this.batchModel.startDate ? new Date(this.batchModel.startDate).toISOString().substring(0, 10): '';
        this.batchModel.endDate = this.batchModel.endDate ? new Date(this.batchModel.endDate).toISOString().substring(0, 10): '';


      });
    });
  }
  ngOnInit() {
    this.getAllInstructors();
    this.getAllLocations();
  }
  getAllInstructors() {
    this.instructorService.instructorList().subscribe((res) => {
      this.instructors = res.result;
    });
  }
  getAllLocations() {
    this.locationService.getAllLocations().subscribe((res) => {
      this.locations = res.result;
    });
  }
  batchModel: BatchResponseModel = new BatchResponseModel();
  instructors: InstructorResponseModel[] = [];
  locations: LocationResponseModel[] = [];
  updatedBatch() {
    this.loadSpinner = true;
    this.updateBatchModel.courseId = this.courseId;
    this.updateBatchModel.batchName=this.batchModel.batchName;
    this.updateBatchModel.batchSize=this.batchModel.batchSize
    this.updateBatchModel.instructorId=this.batchModel.instructorId
    this.updateBatchModel.locationId=this.batchModel.locationId
    this.updateBatchModel.startDate=new Date(this.batchModel.startDate!)
    this.updateBatchModel.endDate=new Date(this.batchModel.endDate!)
    this.updateBatchModel.id = this.batchId;
    this.batchService.updateBatch(this.updateBatchModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.loadSpinner = false;

          this.router.navigate([
            '/academy/batch-list',
            this.batchModel.courseId,
          ]);
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.BadRequest) {
          console.log(err.message);
          this.loadSpinner = false;
        }
      },
    });
  }
}
