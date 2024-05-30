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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedcategoryList: CourseCategoryResponse[] = [];
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
    this.totalItems = this.filteredCategoryList.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  getAllCourseCategories() {
    this.courseService.getAllCourseCategories().subscribe((categories) => {
      this.categoryList = categories.result;
      this.filteredCategoryList=this.categoryList;
      this.totalItems = this.filteredCategoryList.length;
      this.currentPage = 1; 
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedcategoryList = this.filteredCategoryList.slice(startIndex, endIndex);
    this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  
  goToPage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
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
