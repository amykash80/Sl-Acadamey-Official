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
    public interface IContentService
    {
        Task<ApiResponse<CourseContentResponseModel>> CreateContent(CourseContentRequestModel request);
        Task<ApiResponse<CourseContentResponseModel>> GetContentById(Guid id);
        Task<ApiResponse<CourseContentResponseModel>> UpdateContent(CourseContentUpdateRequest request);
        Task<ApiResponse<CourseContentResponseModel>> DeleteContent(Guid id);
        Task<ApiResponse<IEnumerable<CourseContentResponseModel>>> GetContentByCourseId(Guid id);
    }
}
