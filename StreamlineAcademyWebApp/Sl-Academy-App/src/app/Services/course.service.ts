import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { CourseContent, CourseContentResponse, CourseResponse, CreateCourse, UpdateCourse, UpdateCourseContent } from '../Models/Academy/Course';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';


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
  getCategories():Observable<any>{
    return this.http.get<any>(environment.apiUrl+"Course/getAll-CourseCategories");
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
}
