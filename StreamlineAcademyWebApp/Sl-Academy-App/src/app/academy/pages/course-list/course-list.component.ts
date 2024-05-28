import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
 
  constructor(
    private router: Router,
    private courseServices: CourseService,
    private sharedService: SharedService
  ) {}
  courseList: CourseResponse[] = [];
  filteredCourseList:CourseResponse[]=[]
  searchText:string=''
  showNoContent=false;
  showTable=false;
 
  ngOnInit() {
    this.loadAllCourse();
  }

  
  loadAllCourse() {
    this.courseServices.courseList().subscribe({
      next: (response) => {
        this.courseList = response.result;
        this.filteredCourseList=this.courseList;
        if(response.result.length>0){
          this.showTable=true;
        }
        else{
          this.showNoContent=true;
          
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }
 
  filterCourses(event:any){
    const filterValue = event.target.value.toLowerCase();
    this.filteredCourseList = this.courseList.filter(course => 
      course.name?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredCourseList);
  }


  deleteCourse(courseId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Course ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.courseServices.deleteCourse(courseId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllCourse();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}