import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { AcademyResponse, RegisterAcademy } from '../Models/Academy/Academy';
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
}
