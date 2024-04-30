using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }
        [Authorize(Roles =nameof(UserRole.SuperAdmin))]
        [HttpPost("add-new-user")]
        public async Task<ApiResponse<int>> Adduser(UserRequestModel model) => await authService.AddUser(model);
        [Authorize]
        [HttpPost("changePassword")]
        public async Task<ApiResponse<string>> ChangePassword(ChangePasswordRequestModel model) => await authService.ChangePassword(model);
        
        [HttpPost("login")]
        public async Task<ApiResponse<LoginResponseModel>> login(LoginRequestModel model) => await authService.Login(model);

        [HttpPost("forgotPassword")]
        public async Task<ApiResponse<string>> ForgotPassword(ForgotPasswordRequestModel model) => await authService.ForgotPassword(model);

        [HttpPost("resetpassword")]
        public async Task<ApiResponse<string>> ResetPassword(ResetPasswordRequestModel model) => await authService.ResetPassword(model);

        [HttpPost("resend-reset-code")]
        public async Task<ApiResponse<string>> ResendResetCode(ResendResetCodeRequestModel model) => await authService.ResendResetCode(model);

        [HttpGet("check-email/{email}")]
       public async Task<IActionResult> CheckEmailAvailability(string email)
    {
         bool isUnique = await authService.IsEmailUnique(email);

        return Ok(new { isUniqueEmail = isUnique });
    }

    [HttpGet("check-phonenumber/{phonenumber}")]
    public async Task<IResult> CheckPhoneNumberAvailability(string phoneNumber)
    {
        bool isUnique = await authService.IsPhoneNumberUnique(phoneNumber);

        return Results.Ok(new { isUniquePhoneNumber = isUnique });
    }
    }
}
