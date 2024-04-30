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
    public interface IInstructorReository
    {
        #region async methods
        Task<int> InsertAsync(Instructor model);
        Task<int> InsertRangeAsync(List<Instructor> models);
        Task<int> UpdateAsync(Instructor model);
        Task<int> DeleteAsync(Instructor model);
        Task<IEnumerable<Instructor>> GetAllAsync();
        Task<IEnumerable<Instructor>> FindByAsync(Expression<Func<Instructor, bool>> expression);
        Task<Instructor> GetByIdAsync(Expression<Func<Instructor, bool>> expression);
        Task<Instructor> FirstOrDefaultAsync(Expression<Func<Instructor, bool>> expression);
        #endregion
        Task<InstructorResponseModel> GetInstructorById(Guid? id);
        Task<List<InstructorResponseModel>> GetAllInstructors(Guid? id);
        Task<IEnumerable<CourseResponseModel>> GetAllIntructorCourses(Guid? id);
        Task<int> Delete(User model);
        Task<InstructorBatchResponseModel> GetInstructorBatch(Guid? id);
        Task<InstructorResponseModel> GetInstructorAcademy(Guid? id);

    }

}
