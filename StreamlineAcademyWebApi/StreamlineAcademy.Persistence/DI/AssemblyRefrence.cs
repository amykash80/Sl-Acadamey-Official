using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Persistence.Data;
using StreamlineAcademy.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.DI
{
    public static class AssemblyRefrence
    {
        public static IServiceCollection AddPersistenceService(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContextPool<StreamlineDbContet>(options => options.UseSqlServer(configuration.GetConnectionString("SLAcademyDBConnection")));
            services.AddScoped<IEnquiryRepository, EnquiryRepository>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IAcademyRepository, AcademyRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddScoped<IPortalAdminRepository, PortalAdminRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<IBatchRepository, BatchRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IInstructorReository, InstructorRepository>();
            services.AddScoped<IScheduleRepository, ScheduleRepository>();
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IContentRepository, ContentRepository>();
            services.AddScoped<ICourseResourceRepository, CourseResourceRepository>();
            return services;
        }
    }
}
