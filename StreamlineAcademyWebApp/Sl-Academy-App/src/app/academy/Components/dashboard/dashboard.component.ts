import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { CourseService } from '../../../Services/course.service';
import { InstructorService } from '../../../Services/instructor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  shared=inject(SharedService)
  courseService=inject(CourseService)
  instructorService=inject(InstructorService)


  coursesList:CourseResponse[]=[];
  InstructorList:InstructorResponseModel[]=[];
  StudentList:any
  
  addLocation(){

  }
  viewLocations(){
    
  }
  ngOnInit(){
this.courseService.courseList().subscribe(d=>{
  this.coursesList=d.result;
})
this.instructorService.instructorList().subscribe(i=>{
  this.InstructorList=i.result;
})
  }

}
