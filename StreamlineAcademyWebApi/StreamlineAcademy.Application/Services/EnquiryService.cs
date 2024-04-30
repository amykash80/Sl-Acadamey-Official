using AutoMapper;
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
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class EnquiryService : IEnquiryService
    {
        private readonly IEnquiryRepository enquiryrepository;
        private readonly IMapper mapper; 
        public EnquiryService(IEnquiryRepository enquiryrepository,IMapper mapper)
        {
            this.enquiryrepository = enquiryrepository;
            this.mapper = mapper;
        }

       
        public async Task<ApiResponse<EnquiryResponseModel>> AddEnquiry(EnquiryRequestModel request)
        {
            if( await enquiryrepository.FirstOrDefaultAsync(x=>x.Name== request.Name) is not null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryNameExist, HttpStatusCodes.Conflict);

            if (await enquiryrepository.FirstOrDefaultAsync(x => x.Email == request.Email ) is not null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryEmailExist, HttpStatusCodes.Conflict);
            var enquiry = new Enquiry()
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                IsActive = true,
                CreatedBy = Guid.Empty,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };
            var res = await enquiryrepository.InsertAsync(enquiry);
            if (res > 0)
            {
                var enquiryResponse = await enquiryrepository.GetByIdAsync(x => x.Id == enquiry.Id);
                var response = new EnquiryResponseModel()
                {
                    Id = enquiryResponse.Id,
                    Name = enquiryResponse.Name,
                    Email = enquiryResponse.Email,
                    PhoneNumber = enquiryResponse.PhoneNumber,
                    IsActive = true,
                };
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(response,APIMessages.EnquiryManagement.EnquiryAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.TechnicalError,HttpStatusCodes.InternalServerError); 
        }

        public async Task<ApiResponse<EnquiryResponseModel>> UpdateEnquiry(EnquiryUpdateRequest request)
        {
            var result = await enquiryrepository.GetByIdAsync(x => x.Id == request.Id); 
            if(result is null)
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.NotFound); 
            var enquiry = new Enquiry()
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                IsActive = true,
                CreatedBy = Guid.Empty,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };
            var returnVal=  await enquiryrepository.UpdateAsync(enquiry);
            if (returnVal is > 0)
            {
                var enquiryResponse = await enquiryrepository.GetByIdAsync(x => x.Id == enquiry.Id);
                var response = new EnquiryResponseModel()
                {
                    Id = enquiryResponse.Id,
                    Name = enquiryResponse.Name,
                    Email = enquiryResponse.Email,
                    PhoneNumber = enquiryResponse.PhoneNumber,
                    IsActive = true,
                };
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(response, APIMessages.EnquiryManagement.EnquiryUpdated, HttpStatusCodes.Created);
            }
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public  async Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry(Guid id)
        { 
            var existingEnquiry = await enquiryrepository.GetByIdAsync(x => x.Id == id);

            if (existingEnquiry is null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryNotFound);

            existingEnquiry.IsActive = false;
            var result = await enquiryrepository.DeleteAsync(existingEnquiry);
            if (result is > 0)
            {
                var deleteResponse = new EnquiryResponseModel
                {
                    Id = existingEnquiry.Id,
                    Name = existingEnquiry.Name,
                    Email = existingEnquiry.Email,
                    PhoneNumber = existingEnquiry.PhoneNumber,
                    IsActive = true,
                };
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(deleteResponse, APIMessages.EnquiryManagement.EnquiryDeleted);
            }
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries()
        {
            var enquiryList = await enquiryrepository.GetAllAsync();
            if (enquiryList.Any())
            {
                var sortedEnquiries = enquiryList.OrderBy(x => x.Name).Select(e => new EnquiryResponseModel
                {
                    Id = e.Id,
                    Name = e.Name,
                    Email = e.Email,
                    PhoneNumber = e.PhoneNumber,
                    IsActive = true
                });
                return ApiResponse<IEnumerable<EnquiryResponseModel>>.SuccessResponse(sortedEnquiries, $"Found {enquiryList.Count()} Enquiries");
                //return ApiResponse<IEnumerable<EnquiryResponseModel>>.SuccessResponse(mapper.Map<IEnumerable<EnquiryResponseModel>>(enquiryList.OrderBy(x => x.Name)), $"Found {enquiryList.Count()} Enquiries");
            }
            return ApiResponse<IEnumerable<EnquiryResponseModel>>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<EnquiryResponseModel>> GetEnquiryById(Guid id)
        {
            if (await enquiryrepository.GetByIdAsync(x => x.Id == id) is null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(APIMessages.EnquiryManagement.EnquiryNotFound);

            return ApiResponse<EnquiryResponseModel>.SuccessResponse(mapper.Map<EnquiryResponseModel>(await enquiryrepository.GetByIdAsync(x => x.Id == id)));
        }

        public async Task<bool> IsEnquiryEmailUnique(string email)
        {
            return await enquiryrepository.FirstOrDefaultAsync(x => x.Email == email) == null;
        }
    }
}
