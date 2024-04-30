using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Asn1.Cmp;
using Org.BouncyCastle.Asn1.Ocsp;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Application.Utils;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class AcademyService : IAcademyService
    {
        private readonly IAcademyRepository academyRepository;
        private readonly IUserRepository userRepository;
		private readonly IEmailHelperService emailHelperService;
        private readonly IContextService contextService;

        public AcademyService(IAcademyRepository academyRepository,
                               IUserRepository userRepository ,
                               IEmailHelperService emailHelperService,
                               IContextService contextService)
        {
            this.academyRepository = academyRepository;
            this.userRepository = userRepository;
			this.emailHelperService = emailHelperService;
            this.contextService = contextService;
        }

        public async Task<ApiResponse<AcademyResponseModel>> GetAcademyById(Guid id)
        {
            var academy = await academyRepository.GetByIdAsync(x => x.Id == id);
            if (academy is null)
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.AcademyManagement.AcademyNotFound, HttpStatusCodes.NotFound);

            var responseModel = await academyRepository.GetAcademyById(id);
           
            return ApiResponse<AcademyResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<IEnumerable<AcademyResponseModel>>> GetAllAcademies()
        {
            var returnVal = await academyRepository.GetAllAcademies();
            if (returnVal is not null)
                return ApiResponse<IEnumerable<AcademyResponseModel>>.SuccessResponse(returnVal.OrderBy(_=>_.AcademyName),$"Found {returnVal.Count()} Academies");
                return ApiResponse<IEnumerable<AcademyResponseModel>>.ErrorResponse(APIMessages.AcademyManagement.AcademyNotFound,HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<AcademyResponseModel>> RegisterAcademy(AcademyRequestModel request)
        {
            var userId= contextService.GetUserId();
            var existingAcademy = await academyRepository.GetByIdAsync(x => x.AcademyName == request.AcademyName);
            if (existingAcademy is not null)
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.AcademyManagement.AcademyAlreadyRegistered, HttpStatusCodes.Conflict);

            var existingEmail = await userRepository.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (existingEmail is not null)
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.AcademyManagement.AcademyAlreadyRegistered, HttpStatusCodes.Conflict);
            var UserSalt = AppEncryption.GenerateSalt();

            var user = new User() {
                Name = request.Name,
                Email = request.Email,
                PostalCode = request.PostalCode,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                UserRole = UserRole.AcademyAdmin,
                Salt = UserSalt,
                Password = AppEncryption.CreatePassword(request.Password!,UserSalt),
                CreatedBy= userId,
                CreatedDate= DateTime.Now,
                ModifiedBy=Guid.Empty,
                ModifiedDate= DateTime.Now,
                DeletedBy=Guid.Empty,
                IsActive=true
             
            };
            var returnVal = await userRepository.InsertAsync(user); 
            if (returnVal > 0)
            {
                var academy = new Academy() { 
                
                Id=user.Id,
                AcademyName = request.AcademyName,
                AcademyTypeId=request.AcademyTypeId,
                CountryId=request.CountryId,
                StateId=request.StateId,
                CityId=request.CityId,
                };
                var result = await academyRepository.InsertAsync(academy);
                if (result > 0)
				{
                    if (await emailHelperService.SendRegistrationEmail(user.Email!, user.Name!, request.Password!))
                    {
                        var updateStatusResponse = await academyRepository.UpdateRegistrationStatus(academy.Id, RegistrationStatus.Approved);
                        var res = await academyRepository.GetAcademyById(academy.Id);
                        return ApiResponse<AcademyResponseModel>.SuccessResponse(res);
                    }
                } 
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest); 
            }
            return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest); 
        }

        public async Task<ApiResponse<AcademyResponseModel>> DeleteAcademy(Guid id)
        {
            var existingAcademy = await academyRepository.GetByIdAsync(x => x.Id == id);

            if (existingAcademy is null)
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.AcademyManagement.AcademyNotFound,HttpStatusCodes.NotFound);

            var result = await userRepository.FirstOrDefaultAsync(x => x.Id == existingAcademy.Id);
            result.IsActive = false;
            result.ModifiedDate=DateTime.Now;
            result.DeletedDate = DateTime.Now;
            if (result is not null )
            {
                int isSoftDelted = await academyRepository.Delete(result);
                if (isSoftDelted > 0)
                {
					var returnVal = await academyRepository.GetAcademyById(existingAcademy.Id);
					return ApiResponse<AcademyResponseModel>.SuccessResponse(returnVal, APIMessages.AcademyManagement.AcademyDeleted);
				}
			} 
            return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError); 
        }
         

        public async Task<ApiResponse<AcademyResponseModel>> UpdateAcademy(AcademyUpdateRequest request)
        {
            var userId = contextService.GetUserId();
            var user = await userRepository.GetByIdAsync(x => x.Id == request.Id);
            if (user is null)
                return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.UserManagement.UserNotFound, HttpStatusCodes.NotFound);
            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            user.PostalCode = request.PostalCode;
            user.Name = request.Name;
            user.ModifiedDate = DateTime.Now;
            user.ModifiedBy = userId;
            user.IsActive = request.IsActive;
            var userResponse = await userRepository.UpdateAsync(user);

            var academy = await academyRepository.GetByIdAsync(x => x.Id == user.Id);
            academy.AcademyName = request.AcademyName;
            academy.AcademyTypeId = request.AcademyTypeId;
            academy.CountryId = request.CountryId;
            academy.StateId = request.StateId;
            academy.CityId = request.CityId;
            var academyResponse = await userRepository.UpdateAsync(user);

            if (academyResponse is > 0)
            {
                var responseModel = await academyRepository.GetAcademyById(user.Id);
                return ApiResponse<AcademyResponseModel>.SuccessResponse(responseModel, APIMessages.AcademyManagement.AcademyUpdated);
            }
            return ApiResponse<AcademyResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
    

        public async Task<bool> IsAcademyNameUnique(string name)
        {
            return await academyRepository.FirstOrDefaultAsync(x => x.AcademyName == name) == null; 
        }
         
        public async Task<bool> IsAcademyEmailUnique(string email)
        {
            return await userRepository.FirstOrDefaultAsync(x => x.Email == email) == null; 
        }

        public async Task<ApiResponse<AcademyTypeResponseModel>> CreateAcademyType(AcademyTypeRequestModel model)
        {
            var userId = contextService.GetUserId();
            var existingAcademy = await academyRepository.GetAcademyTypeById(x =>x.Name==model.Name);
            if (existingAcademy is not null)
                return ApiResponse<AcademyTypeResponseModel>.ErrorResponse(APIMessages.AcademyManagement.AcademyAlreadyRegistered, HttpStatusCodes.Conflict);
                var acdemyType = new AcademyType() {
                Name= model.Name,
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedBy = Guid.Empty,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                IsActive = true
            };
          var res=  await academyRepository.CreateAcademyType(acdemyType);
            if (res > 0)
            {
                var returnModel = new AcademyTypeResponseModel() { 
                
                Id= acdemyType.Id,
                AcademyTypeName=model.Name,
                };
                return ApiResponse<AcademyTypeResponseModel>.SuccessResponse(returnModel);
            }
            return ApiResponse<AcademyTypeResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }

        public async Task<ApiResponse<IEnumerable<AcademyTypeResponseModel>>> GetAllAcademyTypes()
        {
            var returnVal = await academyRepository.GetAllAcademyTypes();
            List<AcademyTypeResponseModel> academyTypeRequestModels=new List<AcademyTypeResponseModel>();
            if (returnVal is not null)
            {
                foreach (var item in returnVal)
                {
                    var academyTypeResponse = new AcademyTypeResponseModel
                    { 
                        Id = item.Id,
                        AcademyTypeName = item.Name,
                  
                    };
                    academyTypeRequestModels.Add(academyTypeResponse);
                }
                return ApiResponse<IEnumerable<AcademyTypeResponseModel>>.SuccessResponse(academyTypeRequestModels.ToList().OrderBy(_ => _.AcademyTypeName), $"Found {academyTypeRequestModels.Count()} AcademyTypes");

            }

            return ApiResponse<IEnumerable<AcademyTypeResponseModel>>.ErrorResponse(APIMessages.AcademyManagement.AcademyNotFound, HttpStatusCodes.NotFound);
        }
    }
}
