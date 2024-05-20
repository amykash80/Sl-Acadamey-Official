import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';
import { BatchRequestModel, BatchResponseModel } from '../Models/Batch/Batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl
  createBatch(courseModel:BatchRequestModel):Observable<ApiResponse<BatchResponseModel>>{
    return this.http.post<ApiResponse<BatchResponseModel>>(this.baseUrl + "Batch/createBatch",courseModel)
  }
}
