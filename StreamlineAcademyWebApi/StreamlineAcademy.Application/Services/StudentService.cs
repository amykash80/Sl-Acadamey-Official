using Microsoft.AspNetCore.Http.HttpResults;
using Org.BouncyCastle.Asn1.Ocsp;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Application.Utils;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository studentRepository;
        private readonly IUserRepository userRepository;
        private readonly IEmailHelperService emailHelperService;
        private readonly IContextService contextService;
        private readonly IBatchRepository batchRepository;
        private readonly IScheduleRepository scheduleRepository;
        private readonly IInstructorReository instructorReository;
        private readonly IAcademyRepository academyRepository;

        public StudentService(IStudentRepository studentRepository,
                              IUserRepository userRepository,
                              IEmailHelperService emailHelperService,
                              IContextService contextService,
                              IBatchRepository batchRepository,
                              IScheduleRepository scheduleRepository,
                              IInstructorReository instructorReository,
                              IAcademyRepository academyRepository
                              )
        {
            this.studentRepository = studentRepository;
            this.userRepository = userRepository;
            this.emailHelperService = emailHelperService;
            this.contextService = contextService;
            this.batchRepository = batchRepository;
            this.scheduleRepository = scheduleRepository;
            this.instructorReository = instructorReository;
            this.academyRepository = academyRepository;
        }
        public async Task<ApiResponse<StudentResponseModel>> AddStudent(StudentRequestModel model)
        {
            var userId = contextService.GetUserId();
            var existingEmail = await userRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (existingEmail is not null)
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.StudentManagement.StudentAlreadyRegistered, HttpStatusCodes.Conflict);
            var UserSalt = AppEncryption.GenerateSalt();
            var user = new User()
            {
                Name = model.Name,
                Email = model.Email,
                PostalCode = model.PostalCode,
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                UserRole = UserRole.Student,
                Salt = UserSalt,
                Password = AppEncryption.CreatePassword(model.Password!, UserSalt),
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedBy = Guid.Empty,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                IsActive = true
            };
            var returnVal = await userRepository.InsertAsync(user);
            if (returnVal > 0)
            {
                Guid? academyId = Guid.Empty;
                Guid? instructorId= Guid.Empty;
                var portalUser=await userRepository.GetByIdAsync(_=>_.Id==userId);
                if (portalUser.UserRole == UserRole.AcademyAdmin)
                {
                     academyId=portalUser.Id;
                }
                else
                {
                  var instructor=await instructorReository.GetInstructorById(portalUser.Id);
                   var returnAcademy = await academyRepository.GetByIdAsync(_ => _.AcademyName == instructor.AcademyName);
                   academyId = returnAcademy.Id;
                }
                var student = new Student()
                {
                    Id = user.Id,
                    CountryId = model.CountryId,
                    StateId = model.StateId,
                    CityId = model.CityId,
                    AcademyId = academyId,
                    DateOfBirth = model.DateOfBirth,
                    EmergencyContactNo = model.EmergencyContactNo,    
                   
                };
                var result = await studentRepository.InsertAsync(student);
                if (result > 0)
                {
                    List<StudentInterests> StdIntrests = new List<StudentInterests>();
                    foreach (var item in model.CourseId!)
                    {
                        var StudentIntrests = new StudentInterests()
                        {
                            StudentId = user.Id,
                            CourseId = item,
                            CreatedBy = Guid.Empty,
                            CreatedDate = DateTime.Now,
                            ModifiedBy = Guid.Empty,
                            ModifiedDate = DateTime.Now,
                            DeletedBy = Guid.Empty,
                            IsActive = true
                        };
                        StdIntrests.Add(StudentIntrests);
                    }
                    var response = await studentRepository.InsertRangeAsync(StdIntrests);

                    if (await emailHelperService.SendRegistrationEmail(user.Email!, user.Name!, model.Password!))
                    {
                        var res = await studentRepository.GetStudentById(student.Id);
                        return ApiResponse<StudentResponseModel>.SuccessResponse(res);
                    }
                }
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);
        }

        public async Task<ApiResponse<string>> AssignStudentToBatch(StudentBatchRequestModel model)
        {
            var student = await studentRepository.GetByIdAsync(x => x.Id == model.StudentId);
            if (student is null)
                return ApiResponse<string>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);

            var Batch = await batchRepository.GetByIdAsync(x => x.Id == model.BatchId);
            if (Batch is null)
                return ApiResponse<string>.ErrorResponse(APIMessages.BatchManagement.BatchNotFound, HttpStatusCodes.NotFound);

            var userId = contextService.GetUserId();
            var studentBatch = new StudentBatch()
            {
                StudentId = student.Id,
                BatchId = model.BatchId,
                IsActive = true,
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedBy = Guid.Empty,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
            };
            var res = await studentRepository.AddStudentBatch(studentBatch);
            if (res > 0)
                return ApiResponse<string>.SuccessResponse(APIMessages.StudentManagement.BatchAssigned, HttpStatusCodes.OK.ToString());
            return ApiResponse<string>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);


        }
        public async Task<ApiResponse<IEnumerable<StudentResponseModel>>> GetallStudents()
        {
            var academyId = contextService.GetUserId();
            var returnVal = await studentRepository.GetAllStudents(academyId);
            if (returnVal is not null)
                return ApiResponse<IEnumerable<StudentResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.Name), $"Found {returnVal.Count()} Students");
            return ApiResponse<IEnumerable<StudentResponseModel>>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<StudentResponseModel>> GetStudentById(Guid id)
        {
            var student = await studentRepository.GetStudentById(id);
            if (student is null)
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);

            var responseModel = await studentRepository.GetStudentById(id);
            if (responseModel is null)
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.TechnicalError);
            return ApiResponse<StudentResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<IEnumerable<StudentBatchResponseModel>>> GetStudentBatches()
        {
            var studentId = contextService.GetUserId();
            var student = await studentRepository.GetByIdAsync(_ => _.Id == studentId);
            if (student is null)
                return ApiResponse<IEnumerable<StudentBatchResponseModel>>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);

            var returnVal = await studentRepository.GetStudentWithBatchDetails(studentId);
            if (returnVal is not null)
                return ApiResponse<IEnumerable<StudentBatchResponseModel>>.SuccessResponse(returnVal, HttpStatusCodes.OK.ToString());
            return ApiResponse<IEnumerable<StudentBatchResponseModel>>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);
        }

        public async Task<ApiResponse<StudentResponseModel>> UpdateStudent(StudentUpdateRequestModel model)
        {
            var userId = contextService.GetUserId();
            var user = await userRepository.GetByIdAsync(x => x.Id == model.Id);
            if (user is null)
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.UserManagement.UserNotFound, HttpStatusCodes.NotFound);
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.Address = model.Address;
            user.PostalCode = model.PostalCode;
            user.Name = model.Name;
            user.ModifiedDate = DateTime.Now;
            user.ModifiedBy = userId;
            user.IsActive = model.IsActive;
            var userResponse = await userRepository.UpdateAsync(user);

            var student = await studentRepository.GetByIdAsync(x => x.Id == user.Id);
            if (student is null)
                return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);
            student.DateOfBirth = model.DateOfBirth;
            student.EmergencyContactNo = model.EmergencyContactNo;
            student.CountryId = model.CountryId;
            student.StateId = model.StateId;
            student.CityId = model.CityId;
            var studentResponse = await studentRepository.UpdateAsync(student);

            if (studentResponse is > 0)
            {
                var existingInterests = await studentRepository.GetStudentInterestsByStudentId(user.Id);
                foreach (var interest in existingInterests)
                {
                    foreach (var item in model.CourseId!)
                    {
                        interest.CourseId = item;
                        interest.ModifiedDate = DateTime.Now;
                    }
                }
                var response = await studentRepository.InsertRangeAsync(existingInterests);
            };
            var responseModel = await studentRepository.GetStudentById(student.Id);
            if (responseModel is not null)
                return ApiResponse<StudentResponseModel>.SuccessResponse(responseModel, APIMessages.StudentManagement.StudentUpdated);
            return ApiResponse<StudentResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);

        }

        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> CheckMySchedule()
        {
            
            var studentId = contextService.GetUserId();
            var student = await studentRepository.GetByIdAsync(_ => _.Id == studentId);
            if (student is null)
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);
            var schedules = await studentRepository.GetStudentSchedules(studentId);
            schedules = schedules.OrderByDescending(s => s.Date);
            if (schedules.Any())
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.SuccessResponse(schedules, HttpStatusCodes.OK.ToString());
            return ApiResponse< IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.ScheduleManagement.ScheduleNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<IEnumerable<AttendenceResponseModel>>> CheckMyAttendence()
        {
            var studentId=contextService.GetUserId();
            var attendances = await studentRepository.checkMyAttendences(studentId);
            if (!attendances.Any())
                return ApiResponse<IEnumerable<AttendenceResponseModel>>.ErrorResponse("No attendance records found.", HttpStatusCodes.NotFound);

            var attendanceResponses = attendances.Select(_ => new AttendenceResponseModel
            {
                StudentId = _.StudentId,
                ScheduleId = _.ScheduleId,
                Date = _.AttendanceDate,
                AttendenceStatus = _.AttendenceStatus
            });
            return ApiResponse<IEnumerable<AttendenceResponseModel>>.SuccessResponse(attendanceResponses, $"Found {attendanceResponses.Count()} attendences",HttpStatusCodes.OK);
        }

        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> checkMyTodaysSchedule()
        {
            var studentId = contextService.GetUserId();
            var student = await studentRepository.GetByIdAsync(_ => _.Id == studentId);
            if (student is null)
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);

            var schedules = await studentRepository.GetStudentSchedules(studentId);
            var TodaysStudentSchedule= schedules.Where(schedule => schedule.Date == DateTimeOffset.UtcNow.Date);
            if(TodaysStudentSchedule.Any())
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.SuccessResponse(TodaysStudentSchedule, HttpStatusCodes.OK.ToString());
               return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse("There are No Schedules Today");
        }

        public async Task<ApiResponse<IEnumerable<ScheduleResponseModel>>> checkScheduleByDate(DateTimeOffset slectedDate)
        {
            var studentId = contextService.GetUserId();
            var student = await studentRepository.GetByIdAsync(_ => _.Id == studentId);
            if (student is null)
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);

            var schedules = await studentRepository.GetStudentSchedules(studentId);
            var schdeulesFordate = schedules.Where(schedule => schedule.Date == slectedDate);
            if (schdeulesFordate.Any())
                return ApiResponse<IEnumerable<ScheduleResponseModel>>.SuccessResponse(schdeulesFordate, HttpStatusCodes.OK.ToString());
            return ApiResponse<IEnumerable<ScheduleResponseModel>>.ErrorResponse("There are No Schedules for given date You provided");
        }
    }
}







