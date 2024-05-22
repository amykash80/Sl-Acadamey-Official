import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseresourceService } from '../../../Services/courseresource.service';
import { CourseService } from '../../../Services/course.service';
import { SharedService } from '../../../Services/shared.service';
import {
  CourseResource,
  CourseResourceResponse,
} from '../../../Models/CourseResource/CourseResource';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CourseResourceType } from '../../../Enums/courseresourcetype';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-course-resource',
  templateUrl: './create-course-resource.component.html',
  styleUrl: './create-course-resource.component.css',
})
export class CreateCourseResourceComponent {
  courseResourceService = inject(CourseresourceService);
  sharedService = inject(SharedService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  courseResourceModel: CourseResource = new CourseResource();
  courses: CourseResourceResponse[] = [];
  courseId: string = '';
  loadSpinner: boolean = false;
  ngOnInit() {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.courseId = paramVal['id'];
    });
  }

  createCourseResource(event: Event) {
    this.loadSpinner = true;
    this.courseResourceModel.CourseId = this.courseId;
    let myForm = event.target as HTMLFormElement;
    let formData = new FormData(myForm);
    formData.append('CourseId', this.courseId);
    this.courseResourceService
      .createCourceResource(formData)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.sharedService.showSuccessToast(res.message);
          this.loadSpinner = false;
          this.router.navigate(['/academy/course-resource-list',this.courseId])
        }
        else{
          this.sharedService.showErrorToast(res.message)
          this.loadSpinner = false;
        }
      });
  }
}
