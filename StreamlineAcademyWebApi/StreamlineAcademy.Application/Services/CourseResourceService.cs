using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace StreamlineAcademy.Application.Services
{
    public class CourseResourceService : ICourseResourceService
    {
        private readonly ICourseResourceRepository courseResourceRepository;
        private readonly IContextService contextService;
        private readonly IStorageService storageService;
        private readonly ICourseRepository courseRepository;
        private readonly IFileRepository fileRepository;

        public CourseResourceService(ICourseResourceRepository courseResourceRepository,
                                     IContextService contextService,
                                      IStorageService storageService,
                                      ICourseRepository courseRepository,
                                      IFileRepository fileRepository)
        {
            this.courseResourceRepository = courseResourceRepository;
            this.contextService = contextService;
            this.storageService = storageService;
            this.courseRepository = courseRepository;
            this.fileRepository = fileRepository;
        }

        public async Task<ApiResponse<CourseResourceResponseModel>> AddCourseResource(CourseResourceRequestModel request)
        {
            //var userId = contextService.GetUserId();
            //var existingCourse = await courseResourceRepository.GetByIdAsync(x => x.Id == request.CourseId);
            var existingCourse = await courseRepository.GetByIdAsync(x => x.Id == request.CourseId);
            if (existingCourse == null)
                return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseNotFound, HttpStatusCodes.NotFound);
            var filePath = await storageService.UploadFileAsync(request.File!);

            var courseResource = new CourseResource
            {
                Name = request.Name,
                Description = request.Description,
                Type = request.Type,
                FilePath = filePath,
                CourseId = request.CourseId,
                IsActive = true,
                //CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };
            var insertedResource = await courseResourceRepository.InsertAsync(courseResource);

            var appFile = new AppFiles
            {
                //Module = request.Module,
                FilePath = filePath,
                EntityId = courseResource.Id,
            };

            await fileRepository.InsertAsync(appFile);
            if (insertedResource > 0)
            {
                var courseResourceResponse = await courseResourceRepository.GetCourseResourceById(courseResource.Id);
                return ApiResponse<CourseResourceResponseModel>.SuccessResponse(courseResourceResponse, APIMessages.CourseResourceManagement.CourseResourceAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }

        public async Task<ApiResponse<CourseResourceResponseModel>> UpdateCourseResource(CourseResourceUpdateRequest request)
        {
            var existingResource = await courseResourceRepository.GetByIdAsync(x => x.Id == request.Id);
            if (existingResource == null)
            {
                return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.CourseResourceManagement.CourseResourcenotFound, HttpStatusCodes.NotFound);
            }
            var filePath = await storageService.UploadFileAsync(request.File!);
            var appFile = await courseResourceRepository.GetByEntityIdAsync(existingResource.Id);
            if(appFile != null) {
                appFile.FilePath = filePath;  
                await fileRepository.UpdateAsync(appFile);
            }
                existingResource.Name = request.Name;
            existingResource.Description = request.Description;
            existingResource.Type = request.Type;
            existingResource.FilePath = filePath;
            existingResource.CourseId = request.CourseId;
            existingResource.IsActive = true;
            //CreatedBy = userId,
            existingResource.CreatedDate = DateTime.Now;
            existingResource.ModifiedDate = DateTime.Now;
            existingResource.DeletedBy = Guid.Empty;
            existingResource.DeletedDate = DateTime.Now;
            var returnVal = await courseResourceRepository.UpdateAsync(existingResource);
            if (returnVal > 0)
            {
                var responseModel = await courseResourceRepository.GetCourseResourceById(existingResource.Id);
                //var response = new CourseResourceResponseModel()
                //{
                //    Id = existingResource.Id,
                //    Name = existingResource.Name,
                //    Description = existingResource.Description,
                //    Type = existingResource.Type,
                //    FilePath = filePath,
                //    CourseName = existingResource.Course!.Name
                //};
                return ApiResponse<CourseResourceResponseModel>.SuccessResponse(responseModel, APIMessages.CourseResourceManagement.CourseResourceUpdated, HttpStatusCodes.OK);
            }
            return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
        public async Task<ApiResponse<CourseResourceResponseModel>> DeleteCourseResource(Guid Id)
        {
            var existingResource = await courseResourceRepository.GetByIdAsync(x => x.Id == Id);
            if (existingResource == null)
            {
                return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.CourseResourceManagement.CourseResourcenotFound, HttpStatusCodes.NotFound);
            }

            var result = await courseResourceRepository.FirstOrDefaultAsync(x => x.Id == existingResource.Id);
            existingResource.IsActive = false;
            existingResource.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await courseResourceRepository.DeleteAsync(result!);
                if (isSoftDelted > 0)
                {
                    return ApiResponse<CourseResourceResponseModel>.SuccessResponse(null, APIMessages.CourseResourceManagement.CourseResourceDeleted);
                }
            }
            return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
        public async Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetAllCourseResource()
        {
            var returnVal = await courseResourceRepository.GetAllCourseResource();
            if (returnVal is not null)
                return ApiResponse<IEnumerable<CourseResourceResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.Id), $"Found {returnVal.Count()} CourseResources");
            return ApiResponse<IEnumerable<CourseResourceResponseModel>>.ErrorResponse(APIMessages.CourseResourceManagement.CourseResourcenotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<CourseResourceResponseModel>> GetCourseResourceById(Guid id)
        {
            var courseResource = await courseResourceRepository.GetByIdAsync(x => x.Id == id);
            if (courseResource is null)
                return ApiResponse<CourseResourceResponseModel>.ErrorResponse(APIMessages.CourseResourceManagement.CourseResourcenotFound, HttpStatusCodes.NotFound);

            var responseModel = await courseResourceRepository.GetCourseResourceById(id);

            return ApiResponse<CourseResourceResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<IEnumerable<CourseResourceResponseModel>>> GetCourseResourceByCourseId(Guid? courseId)
        {
            var resource = await courseResourceRepository.GetByIdAsync(b => b.CourseId == courseId);
            if (resource == null)
            {
                return ApiResponse<IEnumerable<CourseResourceResponseModel>>.ErrorResponse(APIMessages.CourseResourceManagement.CourseResourcenotFound, HttpStatusCodes.NotFound);
            }
            var courseResource = await courseResourceRepository.GetCourseResourseByCourseId(courseId);
            if (courseResource != null && courseResource.Any())
            {
                var sortedResources = courseResource.OrderBy(c => c.CourseName);
                return ApiResponse<IEnumerable<CourseResourceResponseModel>>.SuccessResponse(sortedResources, $"Found {courseResource.Count()} CourseResource");
            }

            return ApiResponse<IEnumerable<CourseResourceResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
    }
}
        


  
