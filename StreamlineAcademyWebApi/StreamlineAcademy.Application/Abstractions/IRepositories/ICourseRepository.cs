using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
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
    public interface ICourseRepository:IBaseRepository<Course>
    {
        Task<CourseResponseModel> GetCourseById(Guid? id);
        public Task<List<CourseResponseModel>> GetAllCourses();
        Task<int> CreateCourseCategory(CourseCategory model);
        Task<CourseCategory> GetCourseCategoryById(Expression<Func<CourseCategory, bool>> expression);
        public Task<List<CourseCategory>> GetAllCourseCategories();
        public Task<List<CourseResponseModel>> GetAllCoursesByAcademyId(Guid? academyId);



    }
}
