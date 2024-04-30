using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface ICourseService
    {
        Task<ApiResponse<CourseResponseModel>> CreateCourse(CourseRequestModel request);
        Task<ApiResponse<CourseCategoryResponseModel>> CreateCourseCategory(CourseCategoryRequestModel model);
        Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCourses();
        Task<ApiResponse<IEnumerable<CourseCategoryResponseModel>>> GetAllCourseCategories();
        Task<ApiResponse<CourseResponseModel>> GetCourseById(Guid id);
        Task<ApiResponse<CourseResponseModel>> UpdateCourse(CourseUpdateRequest request);
        Task<ApiResponse<CourseResponseModel>> DeleteCourse(Guid id);
        Task<ApiResponse<CourseCategoryResponseModel>> GetCourseCategoryById(Guid id);
        Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCoursesByAcademyId();
    }
}
