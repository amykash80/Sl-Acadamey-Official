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
    public interface IStudentService
    {
        Task<ApiResponse<StudentResponseModel>> AddStudent(StudentRequestModel model);
        Task<ApiResponse<IEnumerable<StudentResponseModel>>> GetallStudents();
        Task<ApiResponse<StudentResponseModel>> GetStudentById(Guid id);
        Task<ApiResponse<StudentResponseModel>> UpdateStudent(StudentUpdateRequestModel model);
        Task<ApiResponse<string>> AssignStudentToBatch(StudentBatchRequestModel model);
        Task<ApiResponse<IEnumerable<StudentBatchResponseModel>>> GetStudentBatches();
        Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> CheckMySchedule();
        Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> checkMyTodaysSchedule();
        Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> checkScheduleByDate(DateTimeOffset slectedDate);
        Task<ApiResponse<IEnumerable<AttendenceResponseModel>>> CheckMyAttendence();

    }
}
