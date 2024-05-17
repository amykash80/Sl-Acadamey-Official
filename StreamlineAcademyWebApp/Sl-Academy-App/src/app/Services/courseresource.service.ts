import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { CourseResource, CourseResourceResponse, UpdateCourseResource } from '../Models/CourseResource/CourseResource';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseresourceService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl
  
  createCourceResource(courseResourceModel:FormData):Observable<ApiResponse<CourseResourceResponse>>{
    return this.http.post<ApiResponse<CourseResourceResponse>>(this.baseUrl + "CourseResource/addCourseResource",courseResourceModel)
  }
  getCourseResourceByCourseId(courseId:string):Observable<ApiResponse<CourseResourceResponse[]>>{
    return this.http.get<ApiResponse<CourseResourceResponse[]>>(this.baseUrl+"CourseResource/getCourseResourceByCourseId"+courseId)
  }
  updateCourseResource(courseResourceUpdateModel:UpdateCourseResource):Observable<ApiResponse<CourseResourceResponse>>{
    return this.http.put<ApiResponse<CourseResourceResponse>>(this.baseUrl+"CourseResource/updatecourseResource",courseResourceUpdateModel)
  }
  deleteCourseResource(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"CourseResource/deleteCourseResource/"+id)
  }
 
}
