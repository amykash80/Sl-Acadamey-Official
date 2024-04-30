using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Shared;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseModel,new()
    {
        private readonly StreamlineDbContet context;

        public BaseRepository(StreamlineDbContet context)
        {
            this.context = context;
        }
        public async Task<int> DeleteAsync(T model)
        {
            context.Set<T>().Remove(model);
            return await context.SaveChangesAsync();
        }

        public Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async Task<T>  FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
           var res= await context.Set<T>().FirstOrDefaultAsync(expression);
            return res!;
            
            
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
           return await context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> expression)
        {
            var res = await context.Set<T>().FirstOrDefaultAsync(expression);
            return res!;
        }

        public async Task<int> InsertAsync(T model)
        {

           await context.Set<T>().AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> InsertRangeAsync(List<T> model)
        {
           await context.Set<T>().AddRangeAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(T model)
        {
            await Task.Run (()=> context.Set<T>().Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
