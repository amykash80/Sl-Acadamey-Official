using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Shared;
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
    public class CourseRepository:BaseRepository<Course>,ICourseRepository
    {
        private readonly StreamlineDbContet context;

        public CourseRepository(StreamlineDbContet context):base(context)
        {
            this.context = context;
        }

        public async Task<int> CreateCourseCategory(CourseCategory model)
        {
            await context.Set<CourseCategory>().AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<CourseCategory> GetCourseCategoryById(Expression<Func<CourseCategory, bool>> expression)
        {
            return await context.CourseCategories.FirstOrDefaultAsync(expression);

        }

        public async Task<CourseResponseModel> GetCourseById(Guid? id)
        {
            var course = await context.Courses
            .Include(a => a.Academy)
            .Include(a => a.CourseCategory)
            .FirstOrDefaultAsync(a => a.Id == id);

            if (course is not null)
            { 
                var response = new CourseResponseModel
                {
                    Id = course.Id,
                    Name = course.Name,
                    Description = course.Description,
                    DurationInWeeks = course.DurationInWeeks, 
                    CategoryName = course.CourseCategory!.CategoryName,
                    AcademyName=course.Academy!.AcademyName,
                    IsActive = course.IsActive,
                    Fee = course.Fee,
                };

                return response;
            }
            return new CourseResponseModel() { };
        }

        public async Task<List<CourseResponseModel>> GetAllCourses()
        {
            var course = await context.Courses                    
                .Include(a => a.CourseCategory)
                 .Include(a => a.Academy)
                .Select(a => new CourseResponseModel
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    DurationInWeeks = a.DurationInWeeks, 
                    CategoryName = a.CourseCategory!.CategoryName,
                    AcademyName = a.Academy!.AcademyName,
                    IsActive = a.IsActive,
                    Fee = a.Fee,
                })
                .ToListAsync();

            return course;
        }

        public async Task<List<CourseCategory>> GetAllCourseCategories()
        {
            return await context.CourseCategories.ToListAsync();

        }

        public async Task<List<CourseResponseModel>> GetAllCoursesByAcademyId(Guid? academyId)
        {
            var courses = await context.Courses
       .Include(a => a.CourseCategory)
       .Include(a => a.Academy)
       .Where(a => a.AcademyId == academyId)
       .Select(a => new CourseResponseModel
       {
           Id = a.Id,
           Name = a.Name,
           Description = a.Description,
           DurationInWeeks = a.DurationInWeeks,
           CategoryName = a.CourseCategory!.CategoryName,
           AcademyName = a.Academy!.AcademyName,
           IsActive = a.IsActive,
           Fee = a.Fee,
       })
       .ToListAsync();

            return courses;
        }



    }
}
