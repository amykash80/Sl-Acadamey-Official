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
  loadSpinner = false;
  updateBatchModel: UpdateBatchModel = new UpdateBatchModel();
  constructor() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.batchId = paramVal['batchId'];
      this.batchService.getBatchById(this.batchId).subscribe((batch) => {
        this.batchModel = batch.result;
        console.log(this.batchModel);
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
    this.updateBatchModel = this.batchModel;
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
