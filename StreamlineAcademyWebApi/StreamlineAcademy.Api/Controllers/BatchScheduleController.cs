using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =nameof(UserRole.AcademyAdmin))]
    public class BatchScheduleController : ControllerBase
    {
        private readonly IScheduleService scheduleService;

        public BatchScheduleController(IScheduleService scheduleService)
        {
            this.scheduleService = scheduleService;
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<ApiResponse<ScheduleResponseModel>> CreateSchedule(ScheduleRequestModel request) => await scheduleService.CreateSchedule(request);
        [HttpGet("getSchedulesByBatchId/{id:guid}")]
        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedulesByBatchId(Guid id) => await scheduleService.GetAllSchedulesByBatchId(id);
        [HttpGet("getAllSchedules")]
        
        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedules() => await scheduleService.GetAllSchedules();
        [HttpPut("updateSchedule")]
        
        public async Task<ApiResponse<ScheduleResponseModel>> UpdateSchedule(ScheduleUpdateRequest model) => await scheduleService.UpdateSchedule(model);
        [HttpDelete("deleteSchedule/{id:guid}")]
       
        public async Task<ApiResponse<ScheduleResponseModel>> DeleteSchedule(Guid id) => await scheduleService.DeleteSchedule(id);
    }
}
