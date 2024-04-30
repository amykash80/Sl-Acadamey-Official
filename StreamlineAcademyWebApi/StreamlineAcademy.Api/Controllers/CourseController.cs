using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService courseService;
        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }
        [HttpPost("createCourses")]
        public async Task<ApiResponse<CourseResponseModel>> CreateCourse(CourseRequestModel request) => await courseService.CreateCourse(request);
        [HttpPost("course-category")]
        public async Task<ApiResponse<CourseCategoryResponseModel>> CreateCourseCategory(CourseCategoryRequestModel request) => await courseService.CreateCourseCategory(request); 
        [HttpGet("getAllCourses")]
        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCourses() => await courseService.GetAllCourses();  
        [HttpGet("getCourseById/{id:guid}")] 
        public async Task<ApiResponse<CourseResponseModel>> GetCourseById(Guid id) => await courseService.GetCourseById(id);
        
        [HttpGet("getAll-CourseCategories")]
        public async Task<ApiResponse<IEnumerable<CourseCategoryResponseModel>>> GetAllCoursecategories() => await courseService.GetAllCourseCategories();  

        [HttpGet("getCourseCategoryById/{id:guid}")]
        public async Task<ApiResponse<CourseCategoryResponseModel>> GetCourseCategorywithId(Guid id) => await courseService.GetCourseCategoryById(id);
        [HttpPut("update")] 
        public async Task<ApiResponse<CourseResponseModel>> UpdateCourse(CourseUpdateRequest model) => await courseService.UpdateCourse(model);
        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse<CourseResponseModel>> DeleteCourse(Guid id) => await courseService.DeleteCourse(id);

        [HttpGet("getAllCoursesByAcademyId")]
        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCoursesByAcademyId() => await courseService.GetAllCoursesByAcademyId();
    }
}
