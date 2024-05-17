import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { LocationRequestModel, LocationResponseModel, UpdateLocationModel } from '../Models/Location/Location';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  baseUrl:string=environment.apiUrl;
  addLocation(locationModel:LocationRequestModel):Observable<ApiResponse<LocationResponseModel>>{
    return this.http.post<ApiResponse<LocationResponseModel>>(this.baseUrl+"Location/add-new-location",locationModel);
  }
  getAllLocations():Observable<ApiResponse<LocationResponseModel[]>>{
    return this.http.get<ApiResponse<LocationResponseModel[]>>(this.baseUrl+"Location/getAllLocations")
  }
  deleteLocation(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"Location/deleteLocation/"+id)

  }
  getLocationById(id:string):Observable<ApiResponse<LocationResponseModel>>{
    return this.http.get<ApiResponse<LocationResponseModel>>(this.baseUrl+"Location/getLocationById/"+id)
   }
   updateLocation(locationUpdateModel:UpdateLocationModel):Observable<ApiResponse<LocationResponseModel>>{
    return this.http.put<ApiResponse<LocationResponseModel>>(this.baseUrl+"Location/updateLocation",locationUpdateModel)
  }
  
}
