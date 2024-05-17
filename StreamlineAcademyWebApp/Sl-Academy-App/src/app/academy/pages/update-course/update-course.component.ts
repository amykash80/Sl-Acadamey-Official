import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { CourseResponse, CreateCourse, UpdateCourse } from '../../../Models/Academy/Course';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})

export class UpdateCourseComponent {

  constructor(private courseService:CourseService,
              private sharedService:SharedService,
              private route: ActivatedRoute  ){
   
  }
  
  courseId: string = '';
  categories: any[] = [];
  academyId:string=''
  course:CourseResponse = new CourseResponse();
  updateCourseModel: UpdateCourse = new UpdateCourse()
  courseModel: CreateCourse = new CreateCourse();
  
  ngOnInit(): void {
    this.getAllCategory();
    this.academyId = localStorage.getItem('userId')!;
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.courseService.getCourseById(this.courseId).subscribe((course) => {
        this.course = course.result;
        this.updateCourseModel.categoryId = this.course.categoryId;
        this.updateCourseModel.academyId = this.course.academyId;
      });
    });
  }
  
  getAllCategory() {
    this.courseService.getCategories().subscribe((categories) => {
      this.categories = categories.result;
      console.log(this.categories);
    
    });
  }
  
  updateCourse(){
    this.courseModel.academyId=this.academyId
    this.updateCourseModel.categoryId = this.course.categoryId;
     this.updateCourseModel=this.course;
    this.courseService.updateCourse(this.updateCourseModel).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message);
          this.router.navigate(['/academy/course-list'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}