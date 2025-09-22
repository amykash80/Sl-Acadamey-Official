import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../Models/Common/login';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Common/api-response';
import { Enquiry, EnquiryResponse } from '../Models/Common/enquiry';
import { ChangePassword } from '../Models/Common/ChangePassword';
import { ForgotPasswordModel } from '../Models/Common/ForgotPassword';
import { ResetPasswordModel } from '../Models/Common/ResetPassword';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpCleint: HttpClient) {}
  baseUrl: string = environment.apiUrl;

  login(loginModel: Login): Observable<ApiResponse<LoginResponse>> {
    return this.httpCleint.post<ApiResponse<LoginResponse>>(
      this.baseUrl + 'Auth/login',
      loginModel
    );
  }
googleOAuthRedirect() {
    
    const queryParams = new URLSearchParams({
      client_id: environment.googleOAuthClientId,
      redirect_uri: environment.redirectUrl,
      response_type: 'code',
      scope: "profile openid  email",
      // state: ${challange.code_verifier}^${model.id},
      access_type: 'offline',
      //check model later to move all the token logic to server side
      // prompt: 'consent',
      // login_hint: model.email
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams.toString()}`;
  
  }
  enquiry(enquiryModel: Enquiry): Observable<ApiResponse<EnquiryResponse>> {
    return this.httpCleint.post<ApiResponse<EnquiryResponse>>(
      this.baseUrl + 'Enquiry/add',
      enquiryModel
    );
  }
  changePassword(
    changePasswordModel: ChangePassword
  ): Observable<ApiResponse<string>> {
    return this.httpCleint.post<ApiResponse<string>>(
      this.baseUrl + 'Auth/changePassword',
      changePasswordModel
    );
  }
  resetPassword(
    resetPasswordModel: ResetPasswordModel
  ): Observable<ApiResponse<string>> {
    return this.httpCleint.post<ApiResponse<string>>(
      this.baseUrl + 'Auth/resetpassword',
      resetPasswordModel
    );
  }
  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('streamlineToken');
  }
  forgotPassword(model: ForgotPasswordModel): Observable<ApiResponse<string>> {
    return this.httpCleint.post<ApiResponse<string>>(
      this.baseUrl + 'Auth/forgotPassword',
      model
    );
  }
}
