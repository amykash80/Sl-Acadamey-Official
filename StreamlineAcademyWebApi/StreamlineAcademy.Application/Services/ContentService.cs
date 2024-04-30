using AutoMapper;
using Org.BouncyCastle.Asn1.Ocsp;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class ContentService:IContentService
    {
        private readonly IContentRepository contentRepository;
        private readonly ICourseRepository courseRepository;

        public ContentService(IContentRepository contentRepository,ICourseRepository courseRepository)
        {
            this.contentRepository = contentRepository;
            this.courseRepository = courseRepository;
        }

        public async Task<ApiResponse<CourseContentResponseModel>> CreateContent(CourseContentRequestModel request)
        {
            var contentId = await courseRepository.GetByIdAsync(x => x.Id == request.CourseId);
            if (contentId == null)
                return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.ContentManagement.ContentNotFound, HttpStatusCodes.Conflict);
            var courseContent = new CourseContent()
            {
                TaskName = request.TaskName,
                Discription=request.Description,
                DurationInHours = request.Duration,
                CourseId=request.CourseId,
                IsActive = true,
                CreatedBy = Guid.Empty,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now, 
            };
            var result = await contentRepository.InsertAsync(courseContent);
            if(result>0)
            {
                var contentResponse = await contentRepository.GetByIdAsync(x => x.Id == courseContent.Id);
                var response = new CourseContentResponseModel()
                {
                    Id=courseContent.Id, 
                   TaskName=courseContent.TaskName,
                   Description=courseContent.Discription,
                   Duration=courseContent.DurationInHours,
                   CourseName=courseContent.Course!.Name

                };
                return ApiResponse<CourseContentResponseModel>.SuccessResponse(response, APIMessages.ContentManagement.ContentAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<CourseContentResponseModel>> DeleteContent(Guid id)
        {
            var existingContent = await contentRepository.GetByIdAsync(x => x.Id == id);
            if (existingContent == null)
                return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.ContentManagement.ContentNotFound, HttpStatusCodes.NotFound);
            
            existingContent.IsActive = false; 
            existingContent.DeletedDate = DateTime.Now;

            var course = await courseRepository.GetByIdAsync(x => x.Id == existingContent.CourseId);
            var isSoftDeleted = await contentRepository.DeleteAsync(existingContent); 
            if (isSoftDeleted > 0) 
                return ApiResponse<CourseContentResponseModel>.SuccessResponse(null, APIMessages.ContentManagement.ContentDeleted);
                return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError); 
        }

        public async Task<ApiResponse<IEnumerable<CourseContentResponseModel>>>GetContentByCourseId(Guid courseId)
        {
            var existingcCourse = await courseRepository.GetByIdAsync(x=>x.Id==courseId);
            if (existingcCourse == null)
                return ApiResponse<IEnumerable<CourseContentResponseModel>>.ErrorResponse(APIMessages.ContentManagement.ContentNotFound, HttpStatusCodes.NotFound);

            var contents = await contentRepository.GetAllContentByCourseId(courseId);
            if (contents != null && contents.Any())
            {
                var sortedContent = contents.OrderBy(c => c.Id);
                return ApiResponse<IEnumerable<CourseContentResponseModel>>.SuccessResponse(sortedContent, $"Found {contents.Count()} CourseContents");
            }

            return ApiResponse<IEnumerable<CourseContentResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<CourseContentResponseModel>> GetContentById(Guid id)
        {
            var content = await contentRepository.GetByIdAsync(x => x.Id == id);
            if (content is null)
                return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.ContentManagement.ContentNotFound, HttpStatusCodes.NotFound);
            var course = await courseRepository.GetByIdAsync(x => x.Id==content.CourseId); 
            
            var response = new CourseContentResponseModel
            {
                Id = content.Id, 
                TaskName = content.TaskName,
                Description = content.Discription, 
                Duration = content.DurationInHours,
                CourseName = content.Course!.Name
            };
            return ApiResponse<CourseContentResponseModel>.SuccessResponse(response);
        }

        public async Task<ApiResponse<CourseContentResponseModel>> UpdateContent(CourseContentUpdateRequest request)
        {
            var contentToUpdate = await contentRepository.GetByIdAsync(x=>x.Id==request.Id);

            if (contentToUpdate == null)
                return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.ContentManagement.ContentNotFound, HttpStatusCodes.NotFound); 
            
            contentToUpdate.TaskName = request.TaskName;
            contentToUpdate.Discription = request.Description;
            contentToUpdate.DurationInHours = request.Duration;
            var course = await courseRepository.GetByIdAsync(x => x.Id == contentToUpdate.CourseId);
            var updateContent=await contentRepository.UpdateAsync(contentToUpdate);
            if (updateContent > 0)
            {
                var updatedResponse = new CourseContentResponseModel
                {
                    Id = contentToUpdate.Id,
                    TaskName = contentToUpdate.TaskName,
                    Description = contentToUpdate.Discription,
                    Duration = contentToUpdate.DurationInHours,
                    CourseName = contentToUpdate.Course!.Name
                };
                return ApiResponse<CourseContentResponseModel>.SuccessResponse(updatedResponse, APIMessages.ContentManagement.ContentUpdated);
            }
            return ApiResponse<CourseContentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }
    }
}
