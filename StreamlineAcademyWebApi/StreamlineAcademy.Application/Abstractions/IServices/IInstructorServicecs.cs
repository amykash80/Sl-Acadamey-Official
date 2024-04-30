using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IInstructorService
    {
        Task<ApiResponse<InstructorResponseModel>> AddInstructor(InstructorRequestModel model);
        Task<ApiResponse<IEnumerable<InstructorResponseModel>>> GetallInstructors();
        Task<ApiResponse<InstructorResponseModel>> GetInstructorById(Guid id);
        Task<ApiResponse<InstructorResponseModel>> DeleteInstructor(Guid id);
        Task<ApiResponse<InstructorResponseModel>> UpdateInstructor(InstructorUpdateRequestModel request);
        Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllInstructorCourses();
        Task<ApiResponse<AttendenceResponseModel>> SaveStudentAttendance(AttendenceRequestModel model);
        Task<ApiResponse<InstructorBatchResponseModel>> GetInstructorBatch();
        Task<bool> SendNotification(NotificationRequestModel request);
        Task<ApiResponse<InstructorResponseModel>> GetInstructorAcademy();
    }
}
