import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';
import { BatchRequestModel, BatchResponseModel, UpdateBatchModel } from '../Models/Batch/Batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl
  createBatch(courseModel:BatchRequestModel):Observable<ApiResponse<BatchResponseModel>>{
    return this.http.post<ApiResponse<BatchResponseModel>>(this.baseUrl + "Batch/createBatch",courseModel)
  }
  getAllBatchesByCourseId(courseId:string):Observable<ApiResponse<BatchResponseModel[]>>{
    return this.http.get<ApiResponse<BatchResponseModel[]>>(this.baseUrl + "Batch/getAllBatchesByCourseId/"+courseId)
  }
  deleteBatch(id:string):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.baseUrl+"Batch/deleteBatch/"+id)
  }
  getBatchById(id:string):Observable<ApiResponse<BatchResponseModel>>{
    return this.http.get<ApiResponse<BatchResponseModel>>(this.baseUrl+"Batch/getBatchById/"+id)
  }
  updateBatch(batchUpdateModel:UpdateBatchModel):Observable<ApiResponse<BatchResponseModel>>{
    return this.http.put<ApiResponse<BatchRequestModel>>(this.baseUrl+"Batch/updateBatch",batchUpdateModel)
  }
}
