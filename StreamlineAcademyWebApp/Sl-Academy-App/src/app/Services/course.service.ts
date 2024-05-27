import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { CourseContent, CourseContentResponse, CourseResponse, CreateCourse, UpdateCourse, UpdateCourseContent } from '../Models/Academy/Course';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { CourseCategoryRequestModel, CourseCategoryResponse } from '../Models/CourseCategory/CourseCategory';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl

  createCourse(courseModel:CreateCourse):Observable<ApiResponse<CourseResponse>>{
    return this.http.post<ApiResponse<CourseResponse>>(this.baseUrl + "Course/createCourses",courseModel)
  }
  courseList():Observable<ApiResponse<CourseResponse[]>>{
    return this.http.get<ApiResponse<CourseResponse[]>>(this.baseUrl+"Course/getAllCoursesByAcademyId")
  }
  updateCourse(courseUpdateModel:UpdateCourse):Observable<ApiResponse<CourseResponse>>{
    return this.http.put<ApiResponse<CourseResponse>>(this.baseUrl+"Course/update",courseUpdateModel)
  }
 
  getCourseById(id: string): Observable<ApiResponse<CourseResponse>> {
    return this.http.get<ApiResponse<CourseResponse>>(`${this.baseUrl}Course/getCourseById/${id}`);
  }
  deleteCourse(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"Course/delete/"+id)
   }
  createCourseContent(courseContentModel:CourseContent):Observable<ApiResponse<CourseContentResponse>>{
    return this.http.post<ApiResponse<CourseContentResponse>>(this.baseUrl+"CourseContent/createContent",courseContentModel)
  }
  getCourseContentsByCourseId(courseId:string):Observable<ApiResponse<CourseContentResponse[]>>{
    return this.http.get<ApiResponse<CourseContentResponse[]>>(this.baseUrl+"CourseContent/getContentByCourseId/"+courseId)
  }
  deleteCourseContent(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"CourseContent/deleteContent/"+id)
   }
   getCourseContentById(contentId:string):Observable<ApiResponse<CourseContentResponse>>{
    return this.http.get<ApiResponse<CourseContentResponse>>(this.baseUrl+"CourseContent/getContentById/"+contentId)
   }
   updateCourseContent(courseContentUpdateModel:UpdateCourseContent):Observable<ApiResponse<CourseContentResponse>>{
    return this.http.put<ApiResponse<CourseContentResponse>>(this.baseUrl+"CourseContent/updateContent",courseContentUpdateModel)
  }
  addCourseCategory(courseCategoryModel:CourseCategoryRequestModel):Observable<ApiResponse<CourseCategoryResponse>>{
    return this.http.post<ApiResponse<CourseCategoryResponse>>(this.baseUrl+"Course/course-category",courseCategoryModel)
  }
  getAllCourseCategories():Observable<ApiResponse<CourseCategoryResponse[]>>{
    return this.http.get<ApiResponse<CourseCategoryResponse[]>>(this.baseUrl+"Course/getAll-CourseCategories");

  }
  deleteCourseCategory(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"Course/deleteCourseCategory/"+id)

  }
  getCourseCategoryById(categoryId:string):Observable<ApiResponse<CourseCategoryResponse>>{
    return this.http.get<ApiResponse<CourseCategoryResponse>>(this.baseUrl+"Course/getCourseCategoryById/"+categoryId)
   }
   updateCourseCategory(courseCategoryUpdateModel:CourseCategoryRequestModel):Observable<ApiResponse<CourseCategoryResponse>>{
    return this.http.put<ApiResponse<CourseCategoryResponse>>(this.baseUrl+"Course/updateCourseCategory",courseCategoryUpdateModel)
  }
}
