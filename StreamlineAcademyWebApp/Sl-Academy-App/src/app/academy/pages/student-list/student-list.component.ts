import { Component } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { SharedService } from '../../../Services/shared.service';
import { StudentResponseModel } from '../../../Models/student/students';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  constructor(
    private studentService: StudentService,
    private sharedService: SharedService
  ) {
    this.loadAllStudents();
  }
  studentList: StudentResponseModel[] = [];
  filteredStudentList: StudentResponseModel[] = [];
  searchText: string = '';
  showStdList=false;
  showNoContent=false;
  

  loadAllStudents() {
    this.studentService.studentList().subscribe({
      next: (response) => {
      
        if(response.result.length>0){
          this.studentList = response.result;
          this.showStdList=true;
          this.showNoContent=false
        }
        else if(response.result.length==0){
          this.showStdList=false;
          this.showNoContent=true
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


