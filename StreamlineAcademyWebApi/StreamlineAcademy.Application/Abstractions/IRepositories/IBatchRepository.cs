using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IBatchRepository:IBaseRepository<Batch>
    {
        Task<BatchResponseModel> GetBatchById(Guid? id);
        public Task<List<BatchResponseModel>> GetAllBatches();
        public Task<List<BatchResponseModel>> GetAllBatchByCourseId(Guid? courseId);
        Task<List<StudentByBatchResponseModel>> GetAllStudentsByBatchId(Guid? batchId);
        

    }
}
