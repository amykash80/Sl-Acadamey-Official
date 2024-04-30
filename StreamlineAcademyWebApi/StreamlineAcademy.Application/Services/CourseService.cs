using AutoMapper;
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
    public class CourseService:ICourseService
    {
        private readonly ICourseRepository courseRepository;
        private readonly IAcademyRepository academyRepository;
        private readonly IContextService contextService;

        public CourseService(ICourseRepository courseRepository,IAcademyRepository academyRepository,IContextService contextService)
        {
            this.courseRepository = courseRepository;
            this.academyRepository = academyRepository;
            this.contextService = contextService;
        }

        public async Task<ApiResponse<CourseResponseModel>> CreateCourse(CourseRequestModel request)
        {
            var academyId = contextService.GetUserId();
            var existingCourse = await courseRepository.GetByIdAsync(x => x.Name == request.Name);
            if (existingCourse is not null)
                return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseAlreadyRegistered, HttpStatusCodes.Conflict);
            var course = new Course()
            {
                Name = request.Name,
                Description=request.Description,
                CategoryId = request.CategoryId,
                AcademyId=request.AcademyId,
                DurationInWeeks = request.DurationInWeeks,
                Fee = request.Fee,
                IsActive = true,
                CreatedBy = academyId,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,

            };
            var res = await courseRepository.InsertAsync(course);
            if (res > 0)
            {
                var courseResponse = await courseRepository.GetCourseById(course.Id);
               
                return ApiResponse<CourseResponseModel>.SuccessResponse(courseResponse, APIMessages.CourseManagement.CourseAdded, HttpStatusCodes.Created);
            }
            return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<CourseCategoryResponseModel>> CreateCourseCategory(CourseCategoryRequestModel model)
        {
            var courseCategory = await courseRepository.GetCourseCategoryById(x => x.CategoryName == model.CategoryName);
            if (courseCategory is not null)
                return ApiResponse<CourseCategoryResponseModel>.ErrorResponse(APIMessages.CourseCategoryManagement.CourseCategoryAlreadyRegistered, HttpStatusCodes.Conflict);
            var courseCategoryModel = new CourseCategory()
            {
                CategoryName= model.CategoryName,
                CreatedBy = Guid.Empty,
                CreatedDate = DateTime.Now,
                ModifiedBy = Guid.Empty,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                IsActive = true
            };
            var res = await courseRepository.CreateCourseCategory(courseCategoryModel);
            if (res > 0)
            {
                var returnModel = new CourseCategoryResponseModel()
                {

                    Id = courseCategoryModel.Id,
                    CategoryName = model.CategoryName,
                };
                return ApiResponse<CourseCategoryResponseModel>.SuccessResponse(returnModel);
            }
            return ApiResponse<CourseCategoryResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<CourseResponseModel>> DeleteCourse(Guid id)
        {
            var existingCourse = await courseRepository.GetByIdAsync(x => x.Id == id);

            if (existingCourse == null)
                return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseNotFound, HttpStatusCodes.NotFound);

            var result = await courseRepository.FirstOrDefaultAsync(x => x.Id == existingCourse.Id);
            existingCourse.IsActive = false;
            existingCourse.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await courseRepository.DeleteAsync(result!);
                if (isSoftDelted > 0)
                {
                    return ApiResponse<CourseResponseModel>.SuccessResponse(null, APIMessages.CourseManagement.CourseDeleted);
                }
            }
            return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<CourseCategoryResponseModel>>> GetAllCourseCategories()
        {
            var returnVal = await courseRepository.GetAllCourseCategories();
            List<CourseCategoryResponseModel> CourseCategoryResponseModels = new List<CourseCategoryResponseModel>();
            if (returnVal is not null)
            {
                foreach (var item in returnVal)
                {
                    var CourseCategoryResponseModel = new CourseCategoryResponseModel
                    {
                        Id = item.Id,
                        CategoryName = item.CategoryName,

                    };
                    CourseCategoryResponseModels.Add(CourseCategoryResponseModel);
                }
                return ApiResponse<IEnumerable<CourseCategoryResponseModel>>.SuccessResponse(CourseCategoryResponseModels.ToList().OrderBy(_ => _.CategoryName), $"Found {CourseCategoryResponseModels.Count()} CourseCategories");
            }

            return ApiResponse<IEnumerable<CourseCategoryResponseModel>>.ErrorResponse(APIMessages.CourseCategoryManagement.CourseCategoryNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCourses()
        {
            var returnVal = await courseRepository.GetAllCourses();
            if (returnVal is not null)
                return ApiResponse<IEnumerable<CourseResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.Name), $"Found {returnVal.Count()} Courses");
            return ApiResponse<IEnumerable<CourseResponseModel>>.ErrorResponse(APIMessages.AcademyManagement.AcademyNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<CourseResponseModel>> GetCourseById(Guid id)
        {
            var course = await courseRepository.GetByIdAsync(x => x.Id == id);
            if (course is null)
                return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseNotFound, HttpStatusCodes.NotFound);

            var responseModel = await courseRepository.GetCourseById(id);

            return ApiResponse<CourseResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<CourseCategoryResponseModel>> GetCourseCategoryById(Guid id)
        {
           var res= await courseRepository.GetCourseCategoryById(x => x.Id == id);
            if (res is not null)
            return ApiResponse<CourseCategoryResponseModel>.SuccessResponse(new CourseCategoryResponseModel() { Id = res!.Id, CategoryName = res.CategoryName, }, HttpStatusCodes.OK.ToString());

            return ApiResponse<CourseCategoryResponseModel>.ErrorResponse(APIMessages.TechnicalError);

        }

        public async Task<ApiResponse<CourseResponseModel>> UpdateCourse(CourseUpdateRequest request)
        {
            var academyId = contextService.GetUserId();
            var existingCourse = await courseRepository.GetByIdAsync(x => x.Id == request.Id);
            if (existingCourse == null)
                return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.CourseManagement.CourseNotFound, HttpStatusCodes.NotFound);
            existingCourse.Name = request.Name;
            existingCourse.Description = request.Description;
            existingCourse.DurationInWeeks = request.DurationInWeeks;
            existingCourse.Fee = request.Fee;
            existingCourse.CategoryId = request.CategoryId;
            existingCourse.AcademyId = request.AcademyId;
            existingCourse.ModifiedDate = DateTime.Now;
            existingCourse.ModifiedBy = academyId;

            var returnVal = await courseRepository.UpdateAsync(existingCourse);
            if (returnVal > 0)
            {
                var responseModel = await courseRepository.GetCourseById(existingCourse.Id);
                var response = new CourseResponseModel()
                {
                    Id = existingCourse.Id,
                    Name = existingCourse.Name,
                    Description = existingCourse.Description,
                    DurationInWeeks = existingCourse.DurationInWeeks,
                    CategoryName = responseModel.CategoryName,
                    AcademyName = responseModel.AcademyName,
                    Fee = existingCourse.Fee,
                    IsActive = existingCourse.IsActive
                };
                return ApiResponse<CourseResponseModel>.SuccessResponse(response, APIMessages.CourseManagement.CourseUpdated, HttpStatusCodes.OK);
            }
            return ApiResponse<CourseResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllCoursesByAcademyId()
        {
            var academyId = contextService.GetUserId();
            var courses = await courseRepository.GetAllCoursesByAcademyId(academyId);
            if (courses != null && courses.Any())
            {
                var sortedCourses = courses.OrderBy(c => c.Name);
                return ApiResponse<IEnumerable<CourseResponseModel>>.SuccessResponse(sortedCourses, $"Found {courses.Count()} Courses");
            }

            return ApiResponse<IEnumerable<CourseResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }


    }
}

