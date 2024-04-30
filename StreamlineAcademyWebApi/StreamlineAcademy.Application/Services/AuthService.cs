using AutoMapper;
using Microsoft.AspNetCore.Identity.Data;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Application.Utils;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly IUserRepository userRepository;
        private readonly IContextService contextService;
        private readonly IEmailHelperService emailHelperService;
        private readonly IJwtProvider jwtProvider;

        public AuthService(IAuthRepository authRepository,
                           IUserRepository userRepository,
                           IContextService contextService,
                           IEmailHelperService emailHelperService,
                           IJwtProvider jwtProvider)
        {
            this.authRepository = authRepository;
            this.userRepository = userRepository;
            this.contextService = contextService;
            this.emailHelperService = emailHelperService;
            this.jwtProvider = jwtProvider;
        }

        public async Task<ApiResponse<string>> ChangePassword(ChangePasswordRequestModel model)
        { 
            var id = contextService.GetUserId();
            var user=await authRepository.FirstOrDefaultAsync(x=>x.Id == id);
            if (user is null)
                return ApiResponse<string>.ErrorResponse(APIMessages.Auth.UserNotFound, HttpStatusCodes.NotFound);

            var res = AppEncryption.ComparePassword(user.Password!, model.OldPassword!, user.Salt!);
            if(!res)
                return ApiResponse<string>.ErrorResponse("Old password is incorrect", HttpStatusCodes.BadRequest); 

            user.Salt = AppEncryption.GenerateSalt();
            user.Password = AppEncryption.CreatePassword(model.NewPassword!, user.Salt);
            int returnVal = await authRepository.UpdateAsync(user);
            if (returnVal > 0)
                return ApiResponse<string>.SuccessResponse(APIMessages.Auth.PasswordChangedSuccess, HttpStatusCodes.OK.ToString());
            return ApiResponse<string>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);   
        }

        public async Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel request)
        {
            var user = await authRepository.FirstOrDefaultAsync(x=>x.Email==request.Email);
            if (user is null)
                return ApiResponse<LoginResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.InvalidCredential,HttpStatusCodes.BadRequest);

            var res = AppEncryption.ComparePassword(user.Password!, request.Password!, user.Salt!);
            if(!res)
                return ApiResponse<LoginResponseModel>.ErrorResponse(APIMessages.Auth.InvalidCredential, HttpStatusCodes.BadRequest);

            var response = new LoginResponseModel()
            {
                FullName = user.Name,
                UserRole = user.UserRole,
                Token = jwtProvider.GenerateToken(user) 
            };

            return ApiResponse<LoginResponseModel>.SuccessResponse(response,APIMessages.Auth.LoggedIn);
        }

		public async Task<bool> IsEmailUnique(string email)
		{
			return await authRepository.FirstOrDefaultAsync(x => x.Email == email) == null;
		}

		public async Task<bool> IsPhoneNumberUnique(string phoneNumber)
		{
			return await authRepository.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber) == null;
		}

        public async Task<ApiResponse<string>> ForgotPassword(ForgotPasswordRequestModel model)
        {
            var user = await userRepository.FirstOrDefaultAsync(user => user.Email == model.Email);
            if (user is null) return ApiResponse<string>.ErrorResponse(APIMessages.Auth.InVaildEmailAddress);
            user.ResetCode = AppEncryption.GetRandomConfirmationCode();
            user.ResetExpiry = DateTime.Now.AddMinutes(3);
            var returnVal=await userRepository.UpdateAsync(user);
            if (returnVal > 0)
            {
              var isEmailSent= await emailHelperService.SendResetPasswordEmail(user.Email!,user.ResetCode);
                if(isEmailSent) 
             return ApiResponse<string>.SuccessResponse(APIMessages.Auth.CheckEmailToResetPassword);

            }
            return ApiResponse<string>.ErrorResponse(APIMessages.TechnicalError);

        }

        public async Task<ApiResponse<string>> ResetPassword(ResetPasswordRequestModel model)
        {
            var currentTime = DateTime.UtcNow;
            var user = await userRepository.FirstOrDefaultAsync(x =>x.ResetCode==model.ResetCode);

            if (user is null)
                return ApiResponse<string>.ErrorResponse(APIMessages.Auth.InValidResetCode, HttpStatusCodes.NotFound);

            if (user.ResetExpiry <= currentTime)
                return ApiResponse<string>.ErrorResponse(APIMessages.Auth.LinkExpired, HttpStatusCodes.NotFound);

            user.Salt = AppEncryption.GenerateSalt();
            user.Password = AppEncryption.CreatePassword(model.NewPassword!, user.Salt);
            user.ResetCode = string.Empty;
            user.ResetExpiry = null;
            int updateResult = await userRepository.UpdateAsync(user);
            if (updateResult > 0)
                return ApiResponse<string>.SuccessResponse(APIMessages.Auth.PasswordResetSuccess);

            return ApiResponse<string>.ErrorResponse(APIMessages.TechnicalError);
        }

        public async Task<ApiResponse<string>> ResendResetCode(ResendResetCodeRequestModel model)
        {
            var user = await userRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (user is null)
                return ApiResponse<string>.ErrorResponse(APIMessages.Auth.UserNotFound, HttpStatusCodes.NotFound);
            user.ResetCode = AppEncryption.GetRandomConfirmationCode();
            user.ResetExpiry = DateTime.UtcNow.AddMinutes(10); 
            int updateResult = await userRepository.UpdateAsync(user);
            if (updateResult > 0)
            {
                var isEmailSent = await emailHelperService.SendResetPasswordEmail(user.Email!, user.ResetCode);
                if (isEmailSent)
                    return ApiResponse<string>.SuccessResponse(APIMessages.Auth.CheckEmailToResetPassword);
            }

            return ApiResponse<string>.ErrorResponse(APIMessages.TechnicalError);
        }

        public async Task<ApiResponse<int>> AddUser(UserRequestModel model)
        {
            var userId = contextService.GetUserId();
            var existingEmail = await userRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (existingEmail is not null)
                return ApiResponse<int>.ErrorResponse(APIMessages.UserManagement.UserAlreadyRegistered, HttpStatusCodes.Conflict);

            var UserSalt = AppEncryption.GenerateSalt();
            var user = new User()
            {
                Name = model.Name,
                Email = model.Email,
                PostalCode = model.PostalCode,
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                Salt = UserSalt,
                UserRole=model.UserRole,
                Password = AppEncryption.CreatePassword(model.Password!, UserSalt),
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedBy = Guid.Empty,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                IsActive = true
            };
            var returnVal = await userRepository.InsertAsync(user);
            if (returnVal > 0)
                return ApiResponse<int>.SuccessResponse(returnVal,"User Created Successfully");
            return ApiResponse<int>.ErrorResponse("Something Went Wrong", HttpStatusCodes.BadRequest);
        }

    }

}
