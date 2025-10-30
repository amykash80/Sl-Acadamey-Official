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
    public interface IEnrollmentService
    {
        Task<ApiResponse<string>> EnrollStudentAsync(EnrollmentRequestModel model);
        Task<ApiResponse<IEnumerable<EnrollmentResponseModel>>> GetAllAsync();
        Task<ApiResponse<IEnumerable<EnrollmentResponseModel>>> GetByStudentIdAsync(Guid studentId);
        Task<ApiResponse<bool>> DeactivateAsync(Guid enrollmentId);
    }

}
