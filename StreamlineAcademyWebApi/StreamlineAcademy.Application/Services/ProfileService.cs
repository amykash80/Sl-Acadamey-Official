﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Org.BouncyCastle.Asn1.Ocsp;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
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
        private readonly IStudentRepository studentRepository;
        private readonly IInstructorReository instructorReository;

        public ProfileService(IProfileRepository profileRepository,
                              IContextService contextService,
                              IFileService fileService,
                              IStorageService storageService,
                              IFileRepository fileRepository,
                              IUserRepository userRepository,
                              IPortalAdminRepository portalAdminRepository,
                              IAcademyRepository academyRepository,
                              IStudentRepository studentRepository,
                              IInstructorReository instructorReository
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
            this.studentRepository = studentRepository;
            this.instructorReository = instructorReository;
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
                PhoneNumber = contact.PhoneNumber,
                UserRole=contact.UserRole,
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
                    var instructor = await instructorReository.FirstOrDefaultAsync(x => x.Id == id);
                    var student = await studentRepository.FirstOrDefaultAsync(x => x.Id == id);
                    if (returnVal.UserRole == UserRole.AcademyAdmin)
                    {
                        academy.CountryId = request.CountryId;
                        academy.StateId = request.StateId;
                        academy.CityId = request.CityId;
                        var res = await academyRepository.UpdateAsync(academy);
                        var result = await academyRepository.GetAcademyById(academy.Id);
                        var resultSet = new AddressInfoResponseModel()
                        {
                            Id = academy.Id,
                            Address = returnVal.Address,
                            PostalCode = returnVal.PostalCode,
                            CountryName = result.CountryName,
                            StateName = result.StateName,
                            CityName = result.CityName,
                            CountryId = result.CountryId,
                            StateId = result.SateId,
                            CityId = result.CityId

                        };
                        return ApiResponse<AddressInfoResponseModel>.SuccessResponse(resultSet, APIMessages.ProfileManagement.AddressUpdated.ToString());

                    }
                    else if (returnVal.UserRole == UserRole.Instructor)
                    {
                         instructor.CountryId = request.CountryId ?? Guid.Empty;
                        instructor.StateId = request.StateId??Guid.Empty;
                        instructor.CityId = request.CityId ?? Guid.Empty;
                        var res = await instructorReository.UpdateAsync(instructor);
                        var result = await instructorReository.GetInstructorById(instructor.Id);
                        var resultSet = new AddressInfoResponseModel()
                        {
                            Id = instructor.Id,
                            Address = returnVal.Address,
                            PostalCode = returnVal.PostalCode,
                            CountryName = result.CountryName,
                            StateName = result.StateName,
                            CityName = result.CityName,
                            CountryId = result.CountryId,
                            StateId = result.StateId,
                            CityId = result.CityId

                        };
                        return ApiResponse<AddressInfoResponseModel>.SuccessResponse(resultSet, APIMessages.ProfileManagement.AddressUpdated.ToString());

                    }
                    else if (returnVal.UserRole == UserRole.Student)
                    {
                        student.CountryId = request.CountryId ?? Guid.Empty;
                        student.StateId = request.StateId ?? Guid.Empty;
                        student.CityId = request.CityId ?? Guid.Empty;
                        var res = await studentRepository.UpdateAsync(student);
                        var result = await studentRepository.GetStudentById(student.Id);
                        var resultSet = new AddressInfoResponseModel()
                        {
                            Id = student.Id,
                            Address = returnVal.Address,
                            PostalCode = returnVal.PostalCode,
                            CountryName = result.CountryName,
                            StateName = result.StateName,
                            CityName = result.CityName,
                            CountryId = result.CountryId,
                            StateId = result.StateId,
                            CityId = result.CityId

                        };
                        return ApiResponse<AddressInfoResponseModel>.SuccessResponse(resultSet, APIMessages.ProfileManagement.AddressUpdated.ToString());

                    }

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

        public async Task<ApiResponse<List<CountryResponse>>> GetAllCountries()
        {
          var countryList= await profileRepository.GetAllCountries();
           var newResponse= countryList.Select(country=>new CountryResponse() { Id=country.Id,CountryName=country.CountryName });
            return ApiResponse<List<CountryResponse>>.SuccessResponse(newResponse.ToList());


        }

        public async Task<ApiResponse<List<StateResponse>>> GetAllStates()
        {
            var stateList = await profileRepository.GetAllStates();
            var newResponse = stateList.Select(state => new StateResponse() {Id=state.Id,StateName=state.StateName,CountryId=state.CountryId});
            return ApiResponse<List<StateResponse>>.SuccessResponse(newResponse.ToList());
        }

        public async Task<ApiResponse<List<CityResponse>>> GetAllCities()
        {

            var cityList = await profileRepository.GetAllCities();
            var newResponse = cityList.Select(city => new CityResponse() { Id = city.Id, CityName = city.CityName,SateId=city.StateId });
            return ApiResponse<List<CityResponse>>.SuccessResponse(newResponse.ToList());
        }

        public async  Task<ApiResponse<FileResponseModel>> GetFilePath()
        {
            var userId = contextService.GetUserId();
            var appFile = await fileRepository.GetByIdAsync(x => x.EntityId == userId);
            if (appFile is not null)
                return ApiResponse<FileResponseModel>.SuccessResponse(new FileResponseModel() { FilePath = appFile.FilePath, Id = appFile.Id });
            return ApiResponse<FileResponseModel>.ErrorResponse("something Went Wrong");
        }

        public async Task<ApiResponse<FileResponseModel>> changeProfilePicture(FileRequestUpdateModel model)
        {
            var userId = contextService.GetUserId();
            if (userId is null)
            {
                return ApiResponse<FileResponseModel>.ErrorResponse((APIMessages.ProfileManagement.UserNotFound));
            }
            var uploadedPhoto = await UploadPhoto(model);
            if (!uploadedPhoto.IsSuccess)
            {
                return ApiResponse<FileResponseModel>.ErrorResponse(uploadedPhoto.Message!);
            }

            var appFiles = new AppFiles
            {
                Id = model.Id,
                Module = model.Module,
                FilePath = uploadedPhoto.Result!.FilePath,
                EntityId = userId
            };

            var fileSave = await fileRepository.UpdateAsync(appFiles);
            if (fileSave > 0)
                return ApiResponse<FileResponseModel>.SuccessResponse(new FileResponseModel() { Id = userId, FilePath = uploadedPhoto.Result.FilePath }, APIMessages.ProfileManagement.ProfileChanged);
            return ApiResponse<FileResponseModel>.ErrorResponse(APIMessages.TechnicalError);
        }
    }
}
