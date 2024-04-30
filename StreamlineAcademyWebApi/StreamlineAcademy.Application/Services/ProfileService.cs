using AutoMapper;
using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
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
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository profileRepository;
        private readonly IContextService contextService;
        private readonly IFileService fileService;
        private readonly IStorageService storageService;
        private readonly IFileRepository fileRepository;
        private readonly IUserRepository userRepository;
        private readonly IPortalAdminRepository portalAdminRepository;
        private readonly IAcademyRepository academyRepository;

        public ProfileService(IProfileRepository profileRepository,
                              IContextService contextService,
                              IFileService fileService,
                              IStorageService storageService,
                              IFileRepository fileRepository,
                              IUserRepository userRepository,
                              IPortalAdminRepository portalAdminRepository,
                              IAcademyRepository academyRepository
                             )
        {
            this.profileRepository = profileRepository;
            this.contextService = contextService;
            this.fileService = fileService;
            this.storageService = storageService;
            this.fileRepository = fileRepository;
            this.userRepository = userRepository;
            this.portalAdminRepository = portalAdminRepository;
            this.academyRepository = academyRepository;
        }
        public async Task<ApiResponse<ContactInfoResponseModel>> GetContactInfoById()
        {
            var userid = contextService.GetUserId();
            var contact = await profileRepository.GetByIdAsync(x => x.Id == userid);
            if (contact is null)
                return ApiResponse<ContactInfoResponseModel>.ErrorResponse(APIMessages.ProfileManagement.UserNotFound);
            var responseModel = new ContactInfoResponseModel
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber
            };
            return ApiResponse<ContactInfoResponseModel>.SuccessResponse(responseModel);

        }

        public async Task<ApiResponse<ContactUpdateModel>> UpdateContact(ContactUpdateModel request)
        {
            var userId = contextService.GetUserId();
            var existingContact = await profileRepository.GetByIdAsync(x => x.Id == userId);

            if (existingContact == null)
                return ApiResponse<ContactUpdateModel>.ErrorResponse(APIMessages.ProfileManagement.UserNotFound);
            existingContact.Name = request.Name;
            existingContact.Email = request.Email;
            existingContact.PhoneNumber = request.PhoneNumber;
            var updateUser = await profileRepository.UpdateAsync(existingContact);
            if (updateUser > 0)
            {
                var updatedContactResponse = new ContactUpdateModel
                {
                    Name = existingContact.Name,
                    Email = existingContact.Email,
                    PhoneNumber = existingContact.PhoneNumber
                };
                return ApiResponse<ContactUpdateModel>.SuccessResponse(updatedContactResponse, APIMessages.ProfileManagement.ContactUpdated, HttpStatusCodes.Created);
            }

            return ApiResponse<ContactUpdateModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<AddressInfoResponseModel>> GetAddressInfoById()
        {

            var id = contextService.GetUserId();
            var res = await profileRepository.GetAddressInfo(id);
            if (res is not null)
                return ApiResponse<AddressInfoResponseModel>.SuccessResponse(res, APIMessages.ProfileManagement.UserFound);
            return ApiResponse<AddressInfoResponseModel>.ErrorResponse(APIMessages.TechnicalError);
        }


        public async Task<ApiResponse<AddressInfoResponseModel>> UpdateAddress(AddressInfoUpdateModel request)
        {
            var id = contextService.GetUserId();
            var returnVal = await userRepository.FirstOrDefaultAsync(x => x.Id == id);
            if(returnVal is not null)
                returnVal.Address = request.Address;
                returnVal!.PostalCode = request.PostalCode;
                var updatedUser = await userRepository.UpdateAsync(returnVal);

              if(updatedUser > 0)
            {
                if(returnVal is not null)
                {
                    var academy = await academyRepository.FirstOrDefaultAsync(x => x.Id == id);
                    academy.CountryId = request.CountryId;
                    academy.StateId = request.StateId;
                    academy.CityId = request.CityId;
                    var res = await academyRepository.UpdateAsync(academy);
                    var result = await academyRepository.GetAcademyById(academy.Id);
                    var resultSet = new AddressInfoResponseModel() { 
                    Id= academy.Id,
                    Address = returnVal.Address,
                    PostalCode= returnVal.PostalCode,
                    CountryName=result.CountryName,
                    StateName= result.StateName,
                    CityName= result.CityName,

                    };

                    return ApiResponse<AddressInfoResponseModel>.SuccessResponse(resultSet,APIMessages.ProfileManagement.AddressUpdated.ToString());
                }
                return ApiResponse<AddressInfoResponseModel>.ErrorResponse(APIMessages.TechnicalError);

            }
            return ApiResponse<AddressInfoResponseModel>.ErrorResponse(APIMessages.TechnicalError); 
        }

        public async Task<ApiResponse<FileResponseModel>> UploadPhoto(FileRequestModel request)
        {
            var userId = contextService.GetUserId();
            if(userId is null)
            {
                return ApiResponse<FileResponseModel>.ErrorResponse((APIMessages.ProfileManagement.UserNotFound));
            }
            var filePath = await storageService.UploadFileAsync(request.File!);
            var appFiles = new AppFiles
            {
                Module = request.Module,
                FilePath = filePath,
                EntityId=userId   
            };
            
           var fileSave = await fileRepository.InsertAsync(appFiles);
            if(fileSave > 0)
            return ApiResponse<FileResponseModel>.SuccessResponse(new FileResponseModel() {Id =userId,FilePath =filePath}, APIMessages.ProfileManagement.PhotoUploaded);
            return ApiResponse<FileResponseModel>.ErrorResponse(APIMessages.TechnicalError);
        }

       
    }
}
