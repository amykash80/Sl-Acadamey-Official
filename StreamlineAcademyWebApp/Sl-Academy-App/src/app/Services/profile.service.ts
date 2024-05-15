import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { AddressResponse, ContactResponse, GetAddress, GetContact } from '../Models/Common/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl

  contactInfo():Observable<ApiResponse<ContactResponse>>{
    return this.http.get<ApiResponse<ContactResponse>>(this.baseUrl+"Profile/getContactInfo")
  }
  updateContact(contactUpdateModel:GetContact):Observable<ApiResponse<ContactResponse>>{
    return this.http.put<ApiResponse<ContactResponse>>(this.baseUrl+"Profile/updateContactInfo",contactUpdateModel)
  }
  addressInfo():Observable<ApiResponse<AddressResponse>>{
    return this.http.get<ApiResponse<AddressResponse>>(this.baseUrl+"Profile/getAddressInfo")
  }
  updateAddress(addressUpdateModel:GetAddress):Observable<ApiResponse<AddressResponse>>{
    return this.http.put<ApiResponse<AddressResponse>>(this.baseUrl+"Profile/updateAddressInfo",addressUpdateModel)
  }

}
