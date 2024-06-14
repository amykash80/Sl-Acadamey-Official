using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
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
        public async Task<AcademyResponseModel> GetPortalAdminById(Guid? id)
        {

            var superAdmin = await context.SuperAdmins
              .Include(a => a.User)
              .Include(a => a.Country)
              .Include(a => a.State)
              .Include(a => a.City)
              .FirstOrDefaultAsync(a => a.Id == id);

            if (superAdmin is not null)
            {

                var response = new AcademyResponseModel
                {
                    Id = superAdmin.Id,
                    AcademyAdmin = superAdmin.User!.Name,
                    Email = superAdmin.User!.Email,
                    PhoneNumber = superAdmin.User.PhoneNumber,
                    PostalCode = superAdmin.User.PostalCode,
                    Address = superAdmin.User.Address,
                    CountryName = superAdmin.Country!.CountryName,
                    StateName = superAdmin.State!.StateName,
                    CityName = superAdmin.City!.CityName,
                    IsActive = superAdmin.User.IsActive,
                    UserRole = superAdmin.User.UserRole,
                    CountryId = superAdmin.Country.Id,
                    SateId = superAdmin.State.Id,
                    CityId = superAdmin.City.Id,
                };

                return response;
            }
            return new AcademyResponseModel() { };

        }

    }
}
