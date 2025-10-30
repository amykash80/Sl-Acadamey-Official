using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IEnrollmentRepository:IBaseRepository<Enrollment>
    {
        Task AddAsync(Enrollment enrollment);
        Task<Enrollment?> GetByIdAsync(Guid id);
        Task UpdateAsync(Enrollment enrollment);
        Task<IEnumerable<EnrollmentResponseModel>> GetAllWithDetailsAsync();
        Task<IEnumerable<EnrollmentResponseModel>> GetByStudentIdAsync(Guid studentId);
    }

}
