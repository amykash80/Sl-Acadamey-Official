using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class AcademyRepository:IAcademyRepository
    {
		private readonly StreamlineDbContet context;

        public AcademyRepository(StreamlineDbContet context)
        {
			this.context = context;
        }

        public async Task<int> CreateAcademyType(AcademyType model)
        {

            await context.Set<AcademyType>().AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> Delete(User model)
		{
			await Task.Run(()=>context.Set<User>().Update(model));
		    return await context.SaveChangesAsync();
		}

		public async Task<int> DeleteAsync(Academy model)
		{
			context.Set<Academy>().Remove(model);
			return await context.SaveChangesAsync();
		}

		public Task<IEnumerable<Academy>> FindByAsync(Expression<Func<Academy, bool>> expression)
		{
			throw new NotImplementedException();
		}

		public async Task<Academy> FirstOrDefaultAsync(Expression<Func<Academy, bool>> expression)
		{
			var res = await context.Set<Academy>().FirstOrDefaultAsync(expression);
			return res!;
		}

		public async Task<AcademyResponseModel> GetAcademyById(Guid? id)
        {

            var academy = await context.Academies
              .Include(a => a.User)
              .Include(a => a.AcademyType)
              .Include(a => a.Country)
              .Include(a => a.State)
              .Include(a => a.City)
              .FirstOrDefaultAsync(a=>a.Id==id);

            if (academy is not null)
            {

                var response = new AcademyResponseModel
                {
                    Id = academy.Id,
                    AcademyName = academy.AcademyName,
					AcademyAdmin=academy.User!.Name,
                    Email = academy.User!.Email,
                    PhoneNumber = academy.User.PhoneNumber,
                    PostalCode = academy.User.PostalCode,
                    Address = academy.User.Address,
                    AcademyType = academy.AcademyType!.Name,
                    CountryName = academy.Country!.CountryName,
                    StateName = academy.State!.StateName,
                    CityName = academy.City!.CityName,
					IsActive=academy.User.IsActive,
                    UserRole = academy.User.UserRole
                };

                return response;
            }
            return new AcademyResponseModel() {  };

        }


        public async Task<List<AcademyResponseModel>> GetAllAcademies()
		{
			var academies = await context.Academies
				.Include(a => a.User) 
				.Include(a => a.AcademyType)
				.Include(a => a.Country)
				.Include(a => a.State)
				.Include(a => a.City)
				.Select(a => new AcademyResponseModel
				{
					Id = a.Id,
					AcademyName = a.AcademyName,
					Email = a.User!.Email,
					PhoneNumber = a.User.PhoneNumber,
					AcademyAdmin = a.User.Name,
					PostalCode = a.User.PostalCode,
					Address = a.User.Address,
					AcademyType = a.AcademyType!.Name,
					CountryName = a.Country!.CountryName,
					StateName = a.State!.StateName,
					CityName = a.City!.CityName,
					UserRole = a.User.UserRole
				})
				.ToListAsync();

			return academies;
		}

        public async Task<List<AcademyType>> GetAllAcademyTypes()
        {
           return await context.Set<AcademyType>().ToListAsync();

        }

        public async Task<IEnumerable<Academy>> GetAllAsync()
		{
           return await context.Set<Academy>().ToListAsync();

		}

		public async Task<Academy> GetByIdAsync(Expression<Func<Academy, bool>> expression)
		{
			return await context.Academies.FirstOrDefaultAsync(expression);
		}

		public async Task<int> InsertAsync(Academy model)
		{

			await context.Set<Academy>().AddAsync(model);
			return await context.SaveChangesAsync();
		}

		public async Task<int> InsertRangeAsync(List<Academy> models)
		{
			await context.Set<Academy>().AddRangeAsync(models);
			return await context.SaveChangesAsync();
		}

		public async Task<int> UpdateAsync(Academy model)
		{
			await Task.Run(() => context.Set<Academy>().Update(model));
			return await context.SaveChangesAsync();
		}

		public async Task<bool> UpdateRegistrationStatus(Guid? id, RegistrationStatus status)
        {
			var enquiry = await context.Enquiries.FirstOrDefaultAsync(e => e.Id == id);

			if (enquiry == null)
			{
				return false; 
			}

			enquiry.RegistrationStatus = status;

			int rowsAffected = await context.SaveChangesAsync();

			return rowsAffected > 0;
		}

        public async Task<AcademyType> GetAcademyTypeById(Expression<Func<AcademyType, bool>> expression)
        {
            return await context.AcademyTypes.FirstOrDefaultAsync(expression);

        }
    }

       
    }

