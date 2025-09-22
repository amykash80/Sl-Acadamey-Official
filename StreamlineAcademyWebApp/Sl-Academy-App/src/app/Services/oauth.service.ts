import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../Models/Common/api-response';
import { LoginResponse } from '../Models/Common/login';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

     constructor(private httpCleint: HttpClient) {}
     baseUrl: string = environment.apiUrl;
   
   generateAccessToken(loginModel: any): Observable<ApiResponse<LoginResponse>> {
       return this.httpCleint.post<ApiResponse<LoginResponse>>(
         this.baseUrl + 'OAuth/GoogleAuth',
         loginModel
       );
     }
}
