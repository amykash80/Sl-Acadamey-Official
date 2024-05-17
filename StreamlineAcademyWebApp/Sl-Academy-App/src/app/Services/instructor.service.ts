import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { InstructorRequestModel, InstructorResponseModel, InstructorUpdateModel } from '../Models/Instructor/Instructor';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  
  constructor(private http:HttpClient) { }
  baseUrl:string = environment.apiUrl

  addinstructor(instructorModel:InstructorRequestModel):Observable<ApiResponse<InstructorResponseModel>>{
    return this.http.post<ApiResponse<InstructorResponseModel>>(this.baseUrl + "Instructor/register-instructor",instructorModel)
  }
  instructorList():Observable<ApiResponse<InstructorResponseModel[]>>{
    return this.http.get<ApiResponse<InstructorResponseModel[]>>(this.baseUrl+"Instructor/getAll-instructors")
  }
  updateInstructor(instructorUpdateModel:InstructorUpdateModel):Observable<ApiResponse<InstructorResponseModel>>{
    return this.http.put<ApiResponse<InstructorResponseModel>>(this.baseUrl+"Instructor/updateInstructor",instructorUpdateModel)
  }
}
