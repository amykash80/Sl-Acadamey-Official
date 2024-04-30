using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IAcademyRepository
    {
		#region async methods
		Task<int> InsertAsync(Academy model);
		Task<int> InsertRangeAsync(List<Academy> models);
		Task<int> UpdateAsync(Academy model);
		Task<int> DeleteAsync(Academy model);
		Task<IEnumerable<Academy>> GetAllAsync();
		Task<IEnumerable<Academy>> FindByAsync(Expression<Func<Academy, bool>> expression);
		Task<Academy> GetByIdAsync(Expression<Func<Academy, bool>> expression);
		Task<Academy> FirstOrDefaultAsync(Expression<Func<Academy, bool>> expression);
		#endregion
		public Task<List<AcademyResponseModel>> GetAllAcademies();
        public Task<List<AcademyType>> GetAllAcademyTypes();
        Task<AcademyResponseModel> GetAcademyById(Guid? id);
		Task<AcademyType> GetAcademyTypeById(Expression<Func<AcademyType, bool>> expression);
		Task<bool> UpdateRegistrationStatus(Guid? id, RegistrationStatus status);
		Task<int> Delete(User model);
		Task<int> CreateAcademyType(AcademyType model);
	  

	}
}
