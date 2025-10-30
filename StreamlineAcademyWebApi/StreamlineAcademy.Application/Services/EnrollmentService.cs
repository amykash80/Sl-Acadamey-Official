using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class EnrollmentService:IEnrollmentService
    {
        public EnrollmentService()
        {
            
        }

        public Task<ApiResponse<bool>> DeactivateAsync(Guid enrollmentId)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<string>> EnrollStudentAsync(EnrollmentRequestModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<IEnumerable<EnrollmentResponseModel>>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<IEnumerable<EnrollmentResponseModel>>> GetByStudentIdAsync(Guid studentId)
        {
            throw new NotImplementedException();
        }
    }
}
