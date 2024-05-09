import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { AddressResponse, ContactResponse } from '../Models/Common/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl

  contactInfo():Observable<ApiResponse<ContactResponse>>{
    return this.http.get<ApiResponse<ContactResponse>>(this.baseUrl+"Profile/getContactInfo")
  }
  addressInfo():Observable<ApiResponse<AddressResponse>>{
    return this.http.get<ApiResponse<AddressResponse>>(this.baseUrl+"Profile/getAddressInfo")
  }
}
