using Microsoft.AspNetCore.Identity.Data;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IAuthService
    {
        Task<ApiResponse<int>> AddUser(UserRequestModel model);
        Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel request);
        Task<ApiResponse<string>> ChangePassword(ChangePasswordRequestModel model);
        Task<ApiResponse<string>> ForgotPassword(ForgotPasswordRequestModel model);
        Task<ApiResponse<string>> ResetPassword(ResetPasswordRequestModel model);
        Task<ApiResponse<string>> ResendResetCode(ResendResetCodeRequestModel model);
        Task<bool> IsEmailUnique(string email);
		Task<bool> IsPhoneNumberUnique(string phoneNumber);
	}
}
