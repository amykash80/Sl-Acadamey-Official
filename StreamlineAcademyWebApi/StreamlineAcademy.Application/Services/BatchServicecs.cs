using Org.BouncyCastle.Bcpg;
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
    public class BatchService : IBatchService
    {
        private readonly IBatchRepository batchRepository;
        private readonly IContextService contextService;

        public BatchService(IBatchRepository batchRepository,
                            IContextService contextService)
        {
            this.batchRepository = batchRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<BatchResponseModel>> CreateBatch(BatchRequestModel request)
        {
            var academyId = contextService.GetUserId();
            var existingBatch = await batchRepository.GetByIdAsync(x => x.BatchName == request.BatchName);
            if (existingBatch != null)
                return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.BatchManagement.BatchAlreadyExists, HttpStatusCodes.Conflict);

            var batch = new Batch()
            {
                BatchName = request.BatchName,
                BatchSize = request.BatchSize,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                CourseId = request.CourseId,
                InstructorId = request.InstructorId,
                LocationId = request.LocationId,
                IsActive = true,
                CreatedBy = academyId,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };

            var res = await batchRepository.InsertAsync(batch);
            if (res > 0)
            {
                var batchResponse = await batchRepository.GetBatchById(batch.Id);
                return ApiResponse<BatchResponseModel>.SuccessResponse(batchResponse, APIMessages.BatchManagement.BatchAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }


        public async Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatches()
        {
            var returnVal = await batchRepository.GetAllBatches();
            if (returnVal is not null)
                return ApiResponse<IEnumerable<BatchResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.BatchName), $"Found {returnVal.Count()} Batches");
            return ApiResponse<IEnumerable<BatchResponseModel>>.ErrorResponse(APIMessages.BatchManagement.BatchnotFound, HttpStatusCodes.NotFound);
        }
        public async Task<ApiResponse<BatchResponseModel>> GetBatchById(Guid id)
        {
            var batch = await batchRepository.GetByIdAsync(x => x.Id == id);
            if (batch is null)
                return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.BatchManagement.BatchnotFound, HttpStatusCodes.NotFound);

            var responseModel = await batchRepository.GetBatchById(id);

            return ApiResponse<BatchResponseModel>.SuccessResponse(responseModel);
        }
        public async Task<ApiResponse<BatchResponseModel>> UpdateBatch(BatchUpdateRequest request)
        {
            var academyId = contextService.GetUserId();
            var existingBatch = await batchRepository.GetByIdAsync(x => x.Id == request.Id);
            if (existingBatch == null)
                return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseNotFound, HttpStatusCodes.NotFound);
            existingBatch.BatchName = request.BatchName;
            existingBatch.BatchSize = request.BatchSize;
            existingBatch.StartDate = request.StartDate;
            existingBatch.EndDate = request.EndDate;
            existingBatch.CourseId = request.CourseId;
            existingBatch.InstructorId = request.InstructorId;
            existingBatch.LocationId = request.LocationId;
            existingBatch.ModifiedDate = DateTime.Now;
            existingBatch.ModifiedBy = academyId;

            var returnVal = await batchRepository.UpdateAsync(existingBatch);
            if (returnVal > 0)
            {
                var responseModel = await batchRepository.GetBatchById(existingBatch.Id);
                var response = new BatchResponseModel()
                {
                    Id = existingBatch.Id,
                    BatchName = existingBatch.BatchName,
                    BatchSize = existingBatch.BatchSize,
                    StartDate = existingBatch.StartDate,
                    EndDate = existingBatch.EndDate,
                    CourseName = responseModel.CourseName,
                    InstructorName = responseModel.InstructorName,
                    LocationName = responseModel.LocationName
                };
                return ApiResponse<BatchResponseModel>.SuccessResponse(response, APIMessages.BatchManagement.BatchUpdated, HttpStatusCodes.OK);
            }
            return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
        public async Task<ApiResponse<BatchResponseModel>> DeleteBatch(Guid id)
        {
            var existingBatch = await batchRepository.GetByIdAsync(x => x.Id == id);

            if (existingBatch == null)
                return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.BatchManagement.BatchNotFound, HttpStatusCodes.NotFound);

            var result = await batchRepository.FirstOrDefaultAsync(x => x.Id == existingBatch.Id);
            existingBatch.IsActive = false;
            existingBatch.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await batchRepository.DeleteAsync(result!);
                if (isSoftDelted > 0)
                {
                    return ApiResponse<BatchResponseModel>.SuccessResponse(null, APIMessages.BatchManagement.BatchDeleted);
                }
            }
            return ApiResponse<BatchResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatchesByCourseId(Guid? courseId)
        {
            var batch = await batchRepository.GetByIdAsync(b => b.CourseId == courseId);
            if (batch == null)
            {
                return ApiResponse<IEnumerable<BatchResponseModel>>.ErrorResponse(APIMessages.BatchManagement.BatchNotFound, HttpStatusCodes.NotFound);
            }
            var batches = await batchRepository.GetAllBatchByCourseId(courseId);
            if (batches != null && batches.Any())
            {
                var sortedBatches = batches.OrderBy(c => c.CourseName);
                return ApiResponse<IEnumerable<BatchResponseModel>>.SuccessResponse(sortedBatches, $"Found {batches.Count()} Batches");
            }

            return ApiResponse<IEnumerable<BatchResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<StudentByBatchResponseModel>>> GetAllStudentsByBatchId(Guid? batchId)
        {
            var existingBatch = await batchRepository.GetByIdAsync(x => x.Id == batchId);
            if (existingBatch == null)
            {
                return ApiResponse<IEnumerable<StudentByBatchResponseModel>>.ErrorResponse(APIMessages.BatchManagement.BatchNotFound, HttpStatusCodes.NotFound);
            }
            var students = await batchRepository.GetAllStudentsByBatchId(batchId);
          if(students == null)
              return ApiResponse<IEnumerable<StudentByBatchResponseModel>>.SuccessResponse(students, $"Found {students!.Count()} students in the batch.");
    
             return ApiResponse<IEnumerable<StudentByBatchResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }
      

        
    }


}
