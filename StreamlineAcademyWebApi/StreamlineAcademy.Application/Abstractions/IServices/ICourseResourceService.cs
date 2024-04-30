using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface ICourseResourceService
    {
        Task<ApiResponse<CourseResourceResponseModel>> AddCourseResource(CourseResourceRequestModel request);
        Task<ApiResponse<CourseResourceResponseModel>> UpdateCourseResource(CourseResourceUpdateRequest request);
        Task<ApiResponse<CourseResourceResponseModel>> DeleteCourseResource(Guid Id);
        Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetAllCourseResource();
        Task<ApiResponse<CourseResourceResponseModel>> GetCourseResourceById(Guid id);
        Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetCourseResourceByCourseId(Guid? courseId);

    }  
}
