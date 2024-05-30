import { Component } from '@angular/core';
import { AssignStudent } from '../../../Models/Batch/Batch';
import { StudentService } from '../../../Services/student.service';
import { SharedService } from '../../../Services/shared.service';
import { BatchService } from '../../../Services/batch.service';
import { ActivatedRoute } from '@angular/router';
import { StudentResponseModel } from '../../../Models/student/students';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { BatchStatus } from '../../../Enums/Batchstatus';

@Component({
  selector: 'app-assin-student-batch',
  templateUrl: './assin-student-batch.component.html',
  styleUrl: './assin-student-batch.component.css'
})
export class AssinStudentBatchComponent {
  constructor(
    private studentService: StudentService,
    private sharedService: SharedService,
    private batchService: BatchService,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe((val) => {
      this.batchId = val['batchId'];
    });
    this.loadAllStudents();

  }
  studentList: StudentResponseModel[] = [];
  filteredStudentList: StudentResponseModel[] = [];
  studentBatchAssignmentModel: AssignStudent = new AssignStudent();
  searchText: string = '';
  batchId:string=''


  filterStudents(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredStudentList = this.studentList.filter((stuudent) =>
      stuudent.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredStudentList);
  }
  isBatchStatusAssigned(status: any): boolean {
    return status === BatchStatus.Assiigned;
  }
  getStatusClass(status: BatchStatus): string {
    switch(status) {
      case BatchStatus.Assiigned:
        return 'chip chip-warning';
      case BatchStatus.NotAssigned:
        return 'chip chip-danger';

      default:
        return 'chip'; 
    }
  }
  assignStudentToBatch(batchId: any, studentId: any) {
    this.studentBatchAssignmentModel.studentId = studentId;
    this.studentBatchAssignmentModel.batchId = batchId;
    this.batchService
      .assignStudentToBatch(this.studentBatchAssignmentModel)
      .subscribe({
        next: (result) => {
          console.log(result);
          
          if (result.isSuccess) {
            this.sharedService.showSuccessToast(result.message
            );
            this.loadAllStudents();
          } else {
            this.sharedService.showErrorToast(result.message
            );
          }
        },
      });
  }
  loadAllStudents() {
    this.studentService.studentList().subscribe({
      next: (response) => {
        console.log(response);
        if (response.result.length > 0) {
          this.studentList = response.result;
          this.filteredStudentList = this.studentList;
        } else if (response.result.length == 0) {
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }
}
