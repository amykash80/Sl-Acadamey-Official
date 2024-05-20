import { Component, inject } from '@angular/core';
import { BatchRequestModel } from '../../../Models/Batch/Batch';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { LocationResponseModel } from '../../../Models/Location/Location';
import { InstructorService } from '../../../Services/instructor.service';
import { LocationService } from '../../../Services/location.service';
import { BatchService } from '../../../Services/batch.service';
import { SharedService } from '../../../Services/shared.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrl: './create-batch.component.css',
})
export class CreateBatchComponent {
  activatedRoute = inject(ActivatedRoute);
  instructorService = inject(InstructorService);
  locationService = inject(LocationService);
  batchService=inject(BatchService)
  sharedService=inject(SharedService)
  router=inject(Router)
  courseId: string = '';
  constructor() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.courseId = paramVal['courseId'];
    });
  }
  ngOnInit() {
    this.getAllInstructors();
    this.getAllLocations();
  }
  getAllInstructors() {
    this.instructorService.instructorList().subscribe((res) => {
      this.instructors = res.result;
      console.log(this.instructors)
    });
  }
  getAllLocations() {
    this.locationService.getAllLocations().subscribe((res) => {
      this.locations = res.result;
      console.log(this.locations)

    });
  }
  batchModel: BatchRequestModel = new BatchRequestModel();
  instructors: InstructorResponseModel[] = [];
  locations: LocationResponseModel[] = [];
  addBatch() {
    this.batchModel.courseId=this.courseId
  this.batchService.createBatch(this.batchModel).subscribe({
      next: (response) => {
        console.log(response)
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          // this.router.navigate(['/academy/course-list'])
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
