import { Component, inject } from '@angular/core';
import { CourseCategoryResponse, CourseCategoryUpdateModel } from '../../../Models/CourseCategory/CourseCategory';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  styleUrl: './course-category-list.component.css',
})
export class CourseCategoryListComponent {
  categoryList: CourseCategoryResponse[] = [];
  courseService = inject(CourseService);
  sharedService = inject(SharedService);
  router=inject(Router)
  filteredCategoryList:CourseCategoryResponse[]=[]
  updateCourseCategoryModel:CourseCategoryUpdateModel=new CourseCategoryUpdateModel()
  loadspinner=false;
  showUpdateForm=false;
  showList=true;
  categoryId=''
  loadSpinner=false;

  constructor() {
    this.getAllCourseCategories();
  }
  deleteCategory(id: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Batch ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.courseService.deleteCourseCategory(id).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.getAllCourseCategories()
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
  filterCategories(event:any){
    const filterValue = event.target.value.toLowerCase();
    this.filteredCategoryList = this.categoryList.filter(category => 
      category.categoryName?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredCategoryList);
  }

  getAllCourseCategories() {
    this.courseService.getAllCourseCategories().subscribe((categories) => {
      this.categoryList = categories.result;
      this.filteredCategoryList=this.categoryList
    });
  }
  getCourseCategoryById(){
this.courseService.getCourseCategoryById(this.categoryId).subscribe(res=>{
  this.updateCourseCategoryModel=res.result;
})
  }
  updateCourseCategory(id:any){
this.categoryId=id 
this.getCourseCategoryById()
this.showList=false;
this.showUpdateForm=true
}
update(){
  this.loadSpinner=true;
  this.courseService.updateCourseCategory(this.updateCourseCategoryModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
       this.loadSpinner=false;
       this.getAllCourseCategories();
       this.showList=true;
       this.showUpdateForm=false
      }
      else{
        this.sharedService.showErrorToast(response.message)
    this.loadSpinner=false;

      }
    },
    error:(err)=>{
      console.log(err)
    this.loadSpinner=false;

    }
  })
}
}
