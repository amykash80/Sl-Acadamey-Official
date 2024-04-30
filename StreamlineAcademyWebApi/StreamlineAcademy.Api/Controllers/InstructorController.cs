using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
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
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorService instructorService;

        public InstructorController(IInstructorService instructorService)
        {
            this.instructorService = instructorService;
        }
        [HttpPost("register-instructor")]
        [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
        public async Task<ApiResponse<InstructorResponseModel>> AddInstructor(InstructorRequestModel model) => await instructorService.AddInstructor(model);
        [HttpGet("getAll-instructors")]
        [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
        public async Task<ApiResponse<IEnumerable<InstructorResponseModel>>> GetAllInstructors() => await instructorService.GetallInstructors();

        [HttpGet("getInstructorById/{id:guid}")]
        [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
        public async Task<ApiResponse<InstructorResponseModel>> GetInstructorById(Guid id) => await instructorService.GetInstructorById(id);

        [HttpDelete("deleteInstructor/{id:guid}")]
        [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
        public async Task<ApiResponse<InstructorResponseModel>> DeleteInstructor(Guid id) => await instructorService.DeleteInstructor(id);

        [HttpPut("updateInstructor")]
        [Authorize(Roles = nameof(UserRole.AcademyAdmin))]
        public async Task<ApiResponse<InstructorResponseModel>> UpdateInstructor(InstructorUpdateRequestModel model) => await instructorService.UpdateInstructor(model);

        [HttpGet("Check-my-courses")]
        [Authorize(Roles = nameof(UserRole.Instructor))]
        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetInstructorCourses()=>await instructorService.GetAllInstructorCourses();
        [HttpGet("Check-my-batches")]
        [Authorize(Roles = nameof(UserRole.Instructor))]
        public async Task<ApiResponse<InstructorBatchResponseModel>> GetAllBatches() => await instructorService.GetInstructorBatch();
        [HttpPost("save-student-attendence")]
        [Authorize(Roles = nameof(UserRole.Instructor))]
        public async Task<ApiResponse<AttendenceResponseModel>> SaveAttendence(AttendenceRequestModel model) => await instructorService.SaveStudentAttendance(model);
        [HttpPost("sendNotification")]
        [Authorize(Roles = nameof(UserRole.Instructor))]
        public async Task<bool> SendNotification(NotificationRequestModel model) => await instructorService.SendNotification(model);
        [HttpGet("Check-my-academy")]
        public async Task<ApiResponse<InstructorResponseModel>> GetInstructorAcademy() => await instructorService.GetInstructorAcademy();
    }
}
