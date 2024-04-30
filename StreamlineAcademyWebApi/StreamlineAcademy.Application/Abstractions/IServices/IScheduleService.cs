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
    public interface IScheduleService
    {
        Task<ApiResponse<ScheduleResponseModel>> CreateSchedule(ScheduleRequestModel request);
        Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedulesByBatchId(Guid? batchId);
        Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedules();
        Task<ApiResponse<ScheduleResponseModel>> UpdateSchedule(ScheduleUpdateRequest request);
        Task<ApiResponse<ScheduleResponseModel>> DeleteSchedule(Guid id);
    }
}
