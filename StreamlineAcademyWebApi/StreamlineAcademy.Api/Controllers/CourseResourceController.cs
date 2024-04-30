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
    [Authorize(Roles =nameof(UserRole.AcademyAdmin))]
    public class CourseResourceController : ControllerBase
    {
        private readonly ICourseResourceService courseResourceService;

        public CourseResourceController(ICourseResourceService courseResourceService)
        {
            this.courseResourceService = courseResourceService;
        }

        [HttpPost("addCourseResource")]
        public async Task<ApiResponse<CourseResourceResponseModel>> AddCourceResource(CourseResourceRequestModel request)=> await courseResourceService.AddCourseResource(request);
        [HttpPut("updateCourseResource")]
        public async Task<ApiResponse<CourseResourceResponseModel>> UpdateCourseResource(CourseResourceUpdateRequest request)=>await courseResourceService.UpdateCourseResource(request);
        [HttpDelete("deleteCourseResource")]
        public async Task<ApiResponse<CourseResourceResponseModel>> DeleteCourseResource(Guid Id)=>await courseResourceService.DeleteCourseResource(Id);
        [HttpGet("getAllCourseResource")]
        public async Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetAllCourseResource() => await courseResourceService.GetAllCourseResource();
        [HttpGet("getCourseResourceById/{id:guid}")]
        public async Task<ApiResponse<CourseResourceResponseModel>> GetCourseResourceById(Guid id) => await courseResourceService.GetCourseResourceById(id);
        [HttpGet("getCourseResourceByCourseId/{id:guid}")]
        public async Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetCourseResourceByCourseId(Guid id) => await courseResourceService.GetCourseResourceByCourseId(id);
    }
}
