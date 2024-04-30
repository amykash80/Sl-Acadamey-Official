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
    public class BatchController : ControllerBase
    {
        private readonly IBatchService batchService;

        public BatchController(IBatchService batchService)
        {
            this.batchService = batchService;
        }

        [HttpPost("createBatch")]
        public async Task<ApiResponse<BatchResponseModel>> CreateBatch(BatchRequestModel request) => await batchService.CreateBatch(request);
        [HttpGet("getAllBatches")]
        public async Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatches() => await batchService.GetAllBatches();
        [HttpGet("getBatchById/{id:guid}")]
        public async Task<ApiResponse<BatchResponseModel>> GetBatchById(Guid id) => await batchService.GetBatchById(id);
        [HttpPut("updateBatch")]
        public async Task<ApiResponse<BatchResponseModel>> UpdateBatch(BatchUpdateRequest model) => await batchService.UpdateBatch(model);
        [HttpDelete("deleteBatch/{id:guid}")]
        public async Task<ApiResponse<BatchResponseModel>> DeleteBatch(Guid id) => await batchService.DeleteBatch(id);

        [HttpGet("getAllBatchesByCourseId/{id:guid}")]
        public async Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatchesByCourseId(Guid id) => await batchService.GetAllBatchesByCourseId(id);
        [HttpGet("getAllStudentsByBatchId/{id:guid}")]
        public async Task<ApiResponse<IEnumerable<StudentByBatchResponseModel>>> GetAllStudentsByBatchId(Guid id) => await batchService.GetAllStudentsByBatchId(id);
       
    }
}
