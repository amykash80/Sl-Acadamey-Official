using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IScheduleRepository:IBaseRepository<Schedule>
    {
        Task<IEnumerable<Schedule>> GetAsync(Expression<Func<Schedule, bool>> predicate);
        Task<List<ScheduleResponseModel>> GetAllSchedules();
        Task<List<ScheduleResponseModel>> GetAllSchedulesByBatchId(Guid? batchId);
        Task<ScheduleResponseModel> GetScheduleById(Guid? id);
    

}
}
