import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../Models/Common/login';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { Enquiry, EnquiryResponse } from '../Models/Common/enquiry';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpCleint:HttpClient) { }
  baseUrl:string=environment.apiUrl

  login(loginModel:Login):Observable<ApiResponse<LoginResponse>>{
    return this.httpCleint.post<ApiResponse<LoginResponse>>(this.baseUrl+"Auth/login",loginModel)
  }
  
   enquiry(enquiryModel:Enquiry):Observable<ApiResponse<EnquiryResponse>>{
    return this.httpCleint.post<ApiResponse<EnquiryResponse>>(this.baseUrl+"Enquiry/add",enquiryModel)
   }

}
