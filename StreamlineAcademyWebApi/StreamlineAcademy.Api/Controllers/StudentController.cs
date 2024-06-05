using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System.Data;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService studentService)
        {
            this.studentService = studentService;
        }

        [HttpPost("register-student")]
        [Authorize(Roles = nameof(UserRole.Instructor) + "," + nameof(UserRole.AcademyAdmin) + ",")]

        public async Task<ApiResponse<StudentResponseModel>> AddStudent(StudentRequestModel model) => await studentService.AddStudent(model);
        [HttpPost("assign-to-Batch")]
        [Authorize(Roles = nameof(UserRole.Instructor) + "," + nameof(UserRole.AcademyAdmin) + ",")]

        public async Task<ApiResponse<StudentResponseModel>> AddStudentToSchedule(StudentBatchRequestModel model) => await studentService.AssignStudentToBatch(model);
        [HttpGet("check-my-Batches")]
        [Authorize(Roles =nameof(UserRole.Student))]
        public async Task<ApiResponse<IEnumerable<StudentBatchResponseModel>>> GetAllStudentBatches() => await studentService.GetStudentBatches();
        [HttpGet("getAll-Students")]
        public async Task<ApiResponse<IEnumerable<StudentResponseModel>>> GetAllStudents() => await studentService.GetallStudents();
        [HttpGet("getStudentById/{id:guid}")]
        public async Task<ApiResponse<StudentResponseModel>> GetStudentById(Guid id) => await studentService.GetStudentById(id);
        [HttpPut("updateStudent")]
        public async Task<ApiResponse<StudentResponseModel>> UpdateStudent(StudentUpdateRequestModel model) => await studentService.UpdateStudent(model);
        [HttpGet("check-my-all-Schedules")]
        [Authorize(Roles = nameof(UserRole.Student))]
        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> CheckMySchedule() => await studentService.CheckMySchedule();
        [HttpGet("check-my-todays-Schedule")]
        [Authorize(Roles = nameof(UserRole.Student))]
        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> CheckMyTodaysSchedule() => await studentService.checkMyTodaysSchedule();
        [HttpGet("check-Schedule-by-date/{selectDate:datetime}")]
        [Authorize(Roles = nameof(UserRole.Student))]
        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> CheckScheduleVyDate(DateTimeOffset selectDate) => await studentService.checkScheduleByDate(selectDate);
        [HttpGet("check-my-attendence")]
        [Authorize(Roles = nameof(UserRole.Student))]
        public async Task<ApiResponse<IEnumerable<AttendenceResponseModel>>> CheckMyattendence() => await studentService.CheckMyAttendence();
        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse<StudentResponseModel>> DeleteStudent(Guid id) => await studentService.DeleteStudent(id);

    }
}
