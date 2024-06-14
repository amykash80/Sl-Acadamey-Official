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
    public interface IPortalAdminRepository
    {
        Task<SuperAdmin> FirstOrDefaultAsync(Expression<Func<SuperAdmin, bool>> expression);
        Task<int> UpdateAsync(SuperAdmin model);
        Task<AcademyResponseModel> GetPortalAdminById(Guid? id);


    }
}
