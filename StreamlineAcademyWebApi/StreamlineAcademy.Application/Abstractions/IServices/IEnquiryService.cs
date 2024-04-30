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
    public interface IEnquiryService
    {
        Task<ApiResponse<EnquiryResponseModel>>AddEnquiry(EnquiryRequestModel request);
        Task<ApiResponse<EnquiryResponseModel>>UpdateEnquiry(EnquiryUpdateRequest request);
        Task <ApiResponse<EnquiryResponseModel>>DeleteEnquiry(Guid id);
        Task<ApiResponse<IEnumerable<EnquiryResponseModel>>>GetAllEnquiries();
        Task<ApiResponse<EnquiryResponseModel>>GetEnquiryById(Guid id);
        Task<bool> IsEnquiryEmailUnique(string email); 
    }
}
