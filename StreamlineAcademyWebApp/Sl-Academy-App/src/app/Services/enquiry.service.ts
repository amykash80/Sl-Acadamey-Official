import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Enquiry, EnquiryResponse, EnquiryUpdate } from '../Models/Common/enquiry';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private HttpClient:HttpClient) { }
  baseUrl:string =environment.apiUrl

  enquiryList():Observable<ApiResponse<EnquiryResponse[]>>{
    return this.HttpClient.get<ApiResponse<EnquiryResponse[]>>(this.baseUrl+"Enquiry/getAll")
  }
 updateEnquiry(enquiryModel:EnquiryUpdate):Observable<ApiResponse<EnquiryResponse>>{
   return this.HttpClient.put<ApiResponse<EnquiryResponse>>(this.baseUrl+"Enquiry/update",enquiryModel)
 }
 deleteEnquiry(id:string):Observable<ApiResponse<string>>{
   return this.HttpClient.delete<ApiResponse<string>>(this.baseUrl+"Enquiry/delete/"+id)
 }
 getEnquiryById(id:string):Observable<ApiResponse<EnquiryResponse>>{
return this.HttpClient.get<ApiResponse<EnquiryResponse>>(this.baseUrl+"Enquiry/getById/"+id)
 }
}
