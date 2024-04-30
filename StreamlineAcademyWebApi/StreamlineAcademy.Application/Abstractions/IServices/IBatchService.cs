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
    public interface IBatchService
    {
        Task<ApiResponse<BatchResponseModel>> CreateBatch(BatchRequestModel request); 
        Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatches(); 
        Task<ApiResponse<BatchResponseModel>> GetBatchById(Guid id);
        Task<ApiResponse<BatchResponseModel>> UpdateBatch(BatchUpdateRequest request);
        Task<ApiResponse<BatchResponseModel>> DeleteBatch(Guid id);
        Task<ApiResponse<IEnumerable<BatchResponseModel>>> GetAllBatchesByCourseId(Guid? courseId);
        Task<ApiResponse<IEnumerable<StudentByBatchResponseModel>>> GetAllStudentsByBatchId(Guid? batchId);
     

    }
}
