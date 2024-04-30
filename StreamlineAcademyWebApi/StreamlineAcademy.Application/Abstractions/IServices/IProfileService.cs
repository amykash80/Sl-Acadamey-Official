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
    public interface IProfileService
    {
        Task<ApiResponse<ContactInfoResponseModel>> GetContactInfoById();
        Task<ApiResponse<ContactUpdateModel>> UpdateContact(ContactUpdateModel request);
        Task<ApiResponse<AddressInfoResponseModel>> GetAddressInfoById();
        Task<ApiResponse<AddressInfoResponseModel>> UpdateAddress(AddressInfoUpdateModel request);
        Task<ApiResponse<FileResponseModel>> UploadPhoto(FileRequestModel request);

    }
}
