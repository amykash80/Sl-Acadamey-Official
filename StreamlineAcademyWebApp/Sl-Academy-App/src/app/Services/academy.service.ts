import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { AcademyResponse } from '../Models/Academy/Academy';
@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private HttpClint:HttpClient) { }
  baseUrl:string = environment.apiUrl

  academyList():Observable<ApiResponse<AcademyResponse[]>>{
    return this.HttpClint.get<ApiResponse<AcademyResponse[]>>(this.baseUrl+"Academy/getAll-acadamies")
  }
}
