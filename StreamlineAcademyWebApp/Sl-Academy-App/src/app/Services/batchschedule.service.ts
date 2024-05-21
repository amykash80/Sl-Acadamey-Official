import { Injectable } from '@angular/core';
import { BatchScheduleRequestModel, BatchScheduleResponseModel, UpdateBatchScheduleModel } from '../Models/BatchSchedule/BatchSchedule';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { ApiResponse } from '../Models/Common/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchscheduleService {

  constructor(private http:HttpClient) { }
  baseUrl:string =environment.apiUrl

  createBatchSchedule(batchScheduleModel:BatchScheduleRequestModel):Observable<ApiResponse<BatchScheduleResponseModel>>{
    return this.http.post<ApiResponse<BatchScheduleResponseModel>>(this.baseUrl + "BatchSchedule/create",batchScheduleModel)
  }
  getAllSchedulesByBatchId(batchId:string):Observable<ApiResponse<BatchScheduleResponseModel[]>>{
    return this.http.get<ApiResponse<BatchScheduleResponseModel[]>>(this.baseUrl + "BatchSchedule/getSchedulesByBatchId/"+batchId)
  }
  batchScheduleList():Observable<ApiResponse<BatchScheduleResponseModel[]>>{
    return this.http.get<ApiResponse<BatchScheduleResponseModel[]>>(this.baseUrl+"BatchSchedule/getAllSchedules")
  }
  updateBatchSchedule(batchScheduleUpdateModel:UpdateBatchScheduleModel):Observable<ApiResponse<BatchScheduleResponseModel>>{
    return this.http.put<ApiResponse<BatchScheduleResponseModel>>(this.baseUrl+"BatchSchedule/updateSchedule",batchScheduleUpdateModel)
  }
 deleteBatchSchedule(id:string):Observable<ApiResponse<string>>{
  return this.http.delete<ApiResponse<string>>(this.baseUrl+"BatchSchedule/deleteSchedule/"+id)
 }
 getContents(id:string):Observable<any>{
  return this.http.get<any>(environment.apiUrl+"CourseContent/getContentByCourseId/"+id);
}
getBatchScheduleById(batchScheduleId:string):Observable<ApiResponse<BatchScheduleResponseModel>>{
  return this.http.get<ApiResponse<BatchScheduleResponseModel>>(this.baseUrl+"BatchSchedule/getScheduleById/"+batchScheduleId)
 }
}
