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


  filterStudents(event:any){
    const filterValue = event.target.value.toLowerCase();
    this.filteredStudentList = this.studentList.filter(stuudent => 
      stuudent.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredStudentList);
  }

  loadAllStudents() {
    this.studentService.studentList().subscribe({
      next: (response) => {
      console.log(response);
        if(response.result.length>0){
          this.studentList = response.result;
          this.filteredStudentList = this.studentList;
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
  deleteStudent(courseId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Student ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.studentService.deleteStudent(courseId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllStudents();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
  
}


