import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { SharedService } from '../../../Services/shared.service';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrl: './instructor-list.component.css'
})

export class InstructorListComponent {
  constructor(
    private instructorService: InstructorService,
    private sharedService: SharedService
  ) {
    this.loadAllInstructors();
  }
  instructorList: InstructorResponseModel[] = [];
  searchText=''
  filterInstructors(){}
  loadAllInstructors() {
    this.instructorService.instructorList().subscribe({
      next: (response) => {
        this.instructorList = response.result;
        console.log(this.instructorList);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }

  deleteInstructor(instructorId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Academy ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.instructorService.deleteInstructor(instructorId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllInstructors();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}
