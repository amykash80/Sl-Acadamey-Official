using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class PortalAdminRepository:IPortalAdminRepository
    {
        private readonly StreamlineDbContet context;

        public PortalAdminRepository(StreamlineDbContet context)
        {
            this.context = context;
        }

        public async Task<SuperAdmin> FirstOrDefaultAsync(Expression<Func<SuperAdmin, bool>> expression)
        {
            var res = await context.Set<SuperAdmin>().FirstOrDefaultAsync(expression);
            return res!;
        }

        public async Task<int> UpdateAsync(SuperAdmin model)
        {
            await Task.Run(() => context.SuperAdmins.Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
