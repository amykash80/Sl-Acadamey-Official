using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IContentRepository:IBaseRepository<CourseContent>
    {
        Task<List<CourseContentResponseModel>> GetAllContentByCourseId(Guid courseId);
    }
}
