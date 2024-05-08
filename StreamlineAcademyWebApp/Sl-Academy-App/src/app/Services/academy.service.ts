import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { AcademyResponse,RegisterAcademy, UpdateAcademy } from '../Models/Academy/Academy';
import { AcademyType, AcademyTypeResponse } from '../Models/Academy/AcademyType';
@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http:HttpClient) { }
  baseUrl:string = environment.apiUrl
 
  createAcademy(academyRegistrationModel:RegisterAcademy):Observable<ApiResponse<AcademyResponse>>{
    return this.http.post<ApiResponse<AcademyResponse>>(this.baseUrl + "Academy/register",academyRegistrationModel)
  }
  academyList():Observable<ApiResponse<AcademyResponse[]>>{
    return this.http.get<ApiResponse<AcademyResponse[]>>(this.baseUrl+"Academy/getAll-acadamies")
  }
  updateAcademy(academyUpdateModel:RegisterAcademy):Observable<ApiResponse<AcademyResponse>>{
    return this.http.put<ApiResponse<AcademyResponse>>(this.baseUrl+"Academy/update",academyUpdateModel)
  }
 deleteAcademy(id:string):Observable<ApiResponse<string>>{
  return this.http.delete<ApiResponse<string>>(this.baseUrl+"Academy/delete/"+id)
 }

 getAcademyById(id:string):Observable<ApiResponse<AcademyResponse>>{
  return this.http.get<ApiResponse<AcademyResponse>>(this.baseUrl+"Academy/getById"+id)
 }

  createAcademyType(academyTypeModel: AcademyType): Observable<ApiResponse<AcademyTypeResponse>>{
  return this.http.post<ApiResponse<AcademyTypeResponse>>(this.baseUrl+"Academy/academy-type",academyTypeModel)
  }
  getAcademyTypes():Observable<ApiResponse<AcademyTypeResponse[]>>{
    return this.http.get<ApiResponse<AcademyTypeResponse[]>>(this.baseUrl+"Academy/getAll-acadamyTypes")
  }

}
