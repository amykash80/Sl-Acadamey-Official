import { Component } from '@angular/core';
import { StudentResponseModel } from '../../../Models/student/students';
import { BatchService } from '../../../Services/batch.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-assigned-students',
  templateUrl: './assigned-students.component.html',
  styleUrl: './assigned-students.component.css'
})
export class AssignedStudentsComponent {
  constructor(private batchService:BatchService,
              private route:ActivatedRoute,
              private sharedService:SharedService
  ){
    this.route.params.subscribe((val) => {
      this.batchId = val['batchId'];
    });
    this.getstudentsByBatchId()
  }
  searchText=''
  batchId=''
  showSpinner=true
  showTable=false
  filteredStudentList:StudentResponseModel[] = [];
  studentList:StudentResponseModel[]=[];
  filterStudents(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredStudentList = this.studentList.filter((stuudent) =>
      stuudent.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredStudentList);
  }
  getstudentsByBatchId() {
    this.batchService.getAllStudentsByBatchId(this.batchId).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.showSpinner=false;
          this.showTable=true
          this.studentList = data.result;
          this.filteredStudentList = this.studentList;

          console.log(this.filteredStudentList);
        } else {
          this.sharedService.showErrorToast(data.message);
        }
      },
    });
  }
}
