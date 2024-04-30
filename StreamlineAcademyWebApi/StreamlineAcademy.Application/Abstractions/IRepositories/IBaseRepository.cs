using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IBaseRepository<T>
    {
        #region async methods
        Task<int> InsertAsync(T model);
        Task<int> InsertRangeAsync(List<T> model);
        Task<int> UpdateAsync(T model);
        Task<int> DeleteAsync(T model);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> expression);
        Task<T> GetByIdAsync(Expression<Func<T,bool>> expression);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> expression);
        
        #endregion 
    }
}
