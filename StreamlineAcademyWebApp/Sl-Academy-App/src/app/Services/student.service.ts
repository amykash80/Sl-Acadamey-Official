import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { StudentResponseModel } from '../Models/student/students';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';
import { AddStudent } from '../Models/student/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  baseUrl:string = environment.apiUrl

  studentList():Observable<ApiResponse<StudentResponseModel[]>>{
    return this.http.get<ApiResponse<StudentResponseModel[]>>(this.baseUrl+"Student/getAll-Students")
  }
  saveStudent(studentModel:AddStudent):Observable<any>{
    return this.http.post<any>(environment.apiUrl+"Student/register-student",studentModel)
  }
  deleteStudent(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"Student/delete/"+id)
   }
}
