import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { CourseResponse, CreateCourse, UpdateCourse } from '../Models/Academy/Course';
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
    return this.http.get<ApiResponse<CourseResponse[]>>(this.baseUrl+"Course/getAllCourses")
  }
  updateCourse(courseUpdateModel:UpdateCourse):Observable<ApiResponse<CourseResponse>>{
    return this.http.put<ApiResponse<CourseResponse>>(this.baseUrl+"Course/update",courseUpdateModel)
  }
  getCategories():Observable<any>{
    return this.http.get<any>(environment.apiUrl+"Course/getAll-CourseCategories");
  }
}
