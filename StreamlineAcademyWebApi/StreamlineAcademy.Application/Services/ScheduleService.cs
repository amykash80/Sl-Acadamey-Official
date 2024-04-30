using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository scheduleRepository;
        private readonly IBatchRepository batchRepository;
        private readonly IContentRepository contentRepository;
        private readonly IContextService contextService;

        public ScheduleService(IScheduleRepository scheduleRepository,
                               IBatchRepository batchRepository,
                               IContentRepository contentRepository,
                               IContextService contextService)
        {
            this.scheduleRepository = scheduleRepository;
            this.batchRepository = batchRepository;
            this.contentRepository = contentRepository;
            this.contextService = contextService;
        }


        public async Task<ApiResponse<ScheduleResponseModel>> CreateSchedule(ScheduleRequestModel request)
        {
            var userId = contextService.GetUserId();
            var existingBatch = await batchRepository.GetByIdAsync(x => x.Id == request.BatchId);
            if (existingBatch == null)
                return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.BatchManagement.BatchnotFound, HttpStatusCodes.NotFound);
            var schedule = new Schedule()
            {

                Date =request.Date!,
                BatchId = request.BatchId!,
                DurationInHours= request.DurationInHours,
                CourseContentId = request.CourseContentId,
                IsActive = true,
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };
            var res = await scheduleRepository.InsertAsync(schedule);
            if (res > 0)
            {
                var scheduleResponse = await scheduleRepository.GetScheduleById(schedule.Id);
                return ApiResponse<ScheduleResponseModel>.SuccessResponse(scheduleResponse, APIMessages.ScheduleManagement.ScheduleAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<ScheduleResponseModel>> DeleteSchedule(Guid id)
        {
            var existingSchedule = await scheduleRepository.GetByIdAsync(x => x.Id == id);
            if (existingSchedule == null)
            {
                return ApiResponse<ScheduleResponseModel>.ErrorResponse("Schedule not found.", HttpStatusCodes.NotFound);
            }
            var result = await scheduleRepository.FirstOrDefaultAsync(x => x.Id == existingSchedule.Id);
            existingSchedule.IsActive = false;
            existingSchedule.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await scheduleRepository.DeleteAsync(result);
                if (isSoftDelted > 0)
                return ApiResponse<ScheduleResponseModel>.SuccessResponse(null, APIMessages.BatchManagement.BatchDeleted);
                
            }
            return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }

        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedules()
        {
            //var scheduleList = await scheduleRepository.GetAllAsync();
            var returnVal = await scheduleRepository.GetAllSchedules();
            if (returnVal is not null)
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.BatchName), $"Found {returnVal.Count()} Batches");
            return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.BatchManagement.BatchnotFound, HttpStatusCodes.NotFound);
        }



        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> GetAllSchedulesByBatchId(Guid? batchId)
        {
            var scheduleId = await scheduleRepository.GetAsync(x => x.BatchId == batchId);
            var schedule = await scheduleRepository.GetAllSchedulesByBatchId(batchId);
            if (schedule != null && schedule.Any())
            {
                var sortedCourses = schedule.OrderBy(c => c.Id);
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.SuccessResponse(sortedCourses, $"Found {schedule.Count()} Schedules");
            }

            return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }

        public async Task<ApiResponse<ScheduleResponseModel>> UpdateSchedule(ScheduleUpdateRequest request)
        {
            var userId = contextService.GetUserId();
            var existingBatch = await batchRepository.GetByIdAsync(x => x.Id == request.BatchId);
            if (existingBatch == null)
                return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.BatchManagement.BatchnotFound, HttpStatusCodes.NotFound);
            var existingSchedule = await scheduleRepository.GetByIdAsync(x => x.Id == request.Id);
            if (existingSchedule == null)
                return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.ScheduleManagement.AllScheduleNotFound, HttpStatusCodes.NotFound);

            existingSchedule.Date =request.Date!;
            existingSchedule.BatchId = request.BatchId!.Value;
            existingSchedule.CourseContentId = request.CourseContentId!.Value;
            existingSchedule.CourseContentId = request.CourseContentId!.Value;
            existingSchedule.ModifiedDate = DateTime.Now;

            var res = await scheduleRepository.UpdateAsync(existingSchedule);
            if (res > 0)
            {
                var responseModel = await scheduleRepository.GetScheduleById(existingSchedule.Id);
                var scheduleResponse = new ScheduleResponseModel
                {
                    Id = existingSchedule.Id,
                    Date = existingSchedule.Date,
                    BatchName = existingBatch.BatchName,
                    ContentName=existingSchedule.CourseContent!.TaskName
                };
                return ApiResponse<ScheduleResponseModel>.SuccessResponse(scheduleResponse, APIMessages.ScheduleManagement.ScheduleUpdated, HttpStatusCodes.OK);
            }
            return ApiResponse<ScheduleResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError); 
        }
         
    }
}
