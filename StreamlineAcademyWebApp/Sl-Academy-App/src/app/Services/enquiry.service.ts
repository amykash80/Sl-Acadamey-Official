import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Enquiry, EnquiryResponse } from '../Models/Common/enquiry';
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

}
