using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface ICourseResourceRepository:IBaseRepository<CourseResource>
    {
        Task<CourseResourceResponseModel> GetCourseResourceById(Guid? id);
        Task<AppFiles?> GetByEntityIdAsync(Guid? entityId);
        Task<List<CourseResourceResponseModel>> GetAllCourseResource();
        Task<List<CourseResourceResponseModel>> GetCourseResourseByCourseId(Guid? courseId);
    }
}
