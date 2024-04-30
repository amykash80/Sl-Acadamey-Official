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
    public class InstructorService : IInstructorService
    {
        private readonly IInstructorReository instructorRepository;
        private readonly IUserRepository userRepository;
        private readonly IEmailHelperService emailHelperService;
        private readonly IContextService contextService;
        private readonly IStudentRepository studentRepository;
        private readonly IBatchRepository batchRepository;
        private readonly IScheduleRepository scheduleRepository;

        public InstructorService(IInstructorReository instructorRepository,
                                  IUserRepository userRepository,
                                  IEmailHelperService emailHelperService,
                                  IContextService contextService,
                                  IStudentRepository studentRepository,
                                  IBatchRepository batchRepository,IScheduleRepository scheduleRepository)
        {
            this.instructorRepository = instructorRepository;
            this.userRepository = userRepository;
            this.emailHelperService = emailHelperService;
            this.contextService = contextService;
            this.studentRepository = studentRepository;
            this.batchRepository = batchRepository;
            this.scheduleRepository = scheduleRepository;
        }
        public async Task<ApiResponse<InstructorResponseModel>> AddInstructor(InstructorRequestModel model)
        {
            var userId = contextService.GetUserId();
            var existingEmail = await userRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (existingEmail is not null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.InstructorManagement.InstructorAlreadyRegistered, HttpStatusCodes.Conflict);
            var UserSalt = AppEncryption.GenerateSalt();

            var user = new User()
            {
                Name = model.Name,
                Email = model.Email,
                PostalCode = model.PostalCode,
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                UserRole = UserRole.Instructor,
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
            var academyId = contextService.GetUserId();
            if (returnVal > 0)
            {
                var instructor = new Instructor()
                {
                    Id = user.Id,
                    CountryId = model.CountryId,
                    StateId = model.StateId,
                    CityId = model.CityId,
                    AcademyId=academyId,
                    WorkExperiance=model.WorkExperience,
                    DateOfBirth=model.DateOfBirth,
                    Skill=Skill.Programming
                };
                var result = await instructorRepository.InsertAsync(instructor);
                if (result > 0)
                {
                    if (await emailHelperService.SendRegistrationEmail(user.Email!, user.Name!, model.Password!))
                    {
                        var res = await instructorRepository.GetInstructorById(instructor.Id);
                        return ApiResponse<InstructorResponseModel>.SuccessResponse(res);
                    }
                }
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.BadRequest);
        }

        public async Task<ApiResponse<InstructorResponseModel>> DeleteInstructor(Guid id)
        {
            var existingInstructor = await instructorRepository.GetInstructorById(id);

            if (existingInstructor is null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.InstructorManagement.InstructorNotFound, HttpStatusCodes.NotFound);

            var result = await userRepository.FirstOrDefaultAsync(x => x.Id == existingInstructor.Id);
            result.IsActive = false;
            result.DeletedDate = DateTime.Now;
            result.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await instructorRepository.Delete(result);
                if (isSoftDelted > 0)
                {
                    var returnVal = await instructorRepository.GetInstructorById(existingInstructor.Id);
                    return ApiResponse<InstructorResponseModel>.SuccessResponse(returnVal, APIMessages.InstructorManagement.InstructorDeleted);
                }
            }
            return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<CourseResponseModel>>> GetAllInstructorCourses()
        {
            var instructorId = contextService.GetUserId();
            var returnVal =  await instructorRepository.GetAllIntructorCourses(instructorId);
            if(returnVal is not null)
                return ApiResponse<IEnumerable<CourseResponseModel>>.SuccessResponse(returnVal);
            return ApiResponse<IEnumerable<CourseResponseModel>>.ErrorResponse(APIMessages.TechnicalError);
        }

        public async  Task<ApiResponse<IEnumerable<InstructorResponseModel>>> GetallInstructors()
        {
            var academyId=contextService.GetUserId();
            var returnVal = await instructorRepository.GetAllInstructors(academyId);
            if (returnVal is not null)
                return ApiResponse<IEnumerable<InstructorResponseModel>>.SuccessResponse(returnVal.OrderBy(_ => _.Name), $"Found {returnVal.Count()} Instructors");
            return ApiResponse<IEnumerable<InstructorResponseModel>>.ErrorResponse(APIMessages.InstructorManagement.InstructorNotFound, HttpStatusCodes.NotFound);
        }

        public async Task<ApiResponse<InstructorResponseModel>> GetInstructorById(Guid id)
        {
            var instructor = await instructorRepository.GetInstructorById(id);
            if (instructor is null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.InstructorManagement.InstructorNotFound, HttpStatusCodes.NotFound);

            var responseModel = await instructorRepository.GetInstructorById(id);
            if (responseModel is null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError);
            return ApiResponse<InstructorResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<InstructorResponseModel>> UpdateInstructor(InstructorUpdateRequestModel request)
        {
            var userId = contextService.GetUserId();
            var user = await userRepository.GetByIdAsync(x=>x.Id==request.Id);
            if (user is null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.InstructorManagement.InstructorNotFound, HttpStatusCodes.NotFound);
            user.Email= request.Email;
            user.PhoneNumber= request.PhoneNumber;
            user.Address=request.Address;
            user.PostalCode= request.PostalCode;
            user.Name=request.Name;
            user.ModifiedDate = DateTime.Now;
            user.ModifiedBy = userId;
            user.IsActive = request.IsActive;
            var userResponse = await userRepository.UpdateAsync(user);

            var instructor = await instructorRepository.GetByIdAsync(x=>x.Id==user.Id);
            instructor.DateOfBirth = request.DateOfBirth;
            instructor.WorkExperiance = request.WorkExperience;
            instructor.DateOfBirth=request.DateOfBirth;
            instructor.CountryId= request.CountryId;
            instructor.StateId=request.StateId;
            instructor.CityId=request.CityId;
            
            var instructorResponse = await instructorRepository.UpdateAsync(instructor);

            if (instructorResponse is > 0)
            {
                var responseModel= await instructorRepository.GetInstructorById(instructor.Id);
                return ApiResponse<InstructorResponseModel>.SuccessResponse(responseModel, APIMessages.InstructorManagement.InstructorUpdated);
            }
            return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
        public async Task<ApiResponse<InstructorBatchResponseModel>> GetInstructorBatch()
        {
            var instructorId = contextService.GetUserId();
            var instructor = await instructorRepository.GetByIdAsync(_ => _.Id ==instructorId);
            if (instructor is null)
                return ApiResponse<InstructorBatchResponseModel>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound, HttpStatusCodes.NotFound);
            var returnVal = await instructorRepository.GetInstructorBatch(instructorId);
            if (returnVal is not null)
                return ApiResponse<InstructorBatchResponseModel>.SuccessResponse(returnVal);
            return ApiResponse<InstructorBatchResponseModel>.ErrorResponse(APIMessages.TechnicalError);
        }

        public async Task<ApiResponse<AttendenceResponseModel>> SaveStudentAttendance(AttendenceRequestModel model)
        {
            var instructorId= contextService.GetUserId();
            if (await studentRepository.GetByIdAsync(_ => _.Id == model.StudentId) is null)
                return ApiResponse<AttendenceResponseModel>.ErrorResponse(APIMessages.StudentManagement.StudentNotFound);
            var attendance = new Attendance
            {
                StudentId = model.StudentId,
                ScheduleId = model.ScheduleId,
                AttendanceDate = model.AttendanceDate,
                AttendenceStatus = model.AttendenceStatus,
                CreatedBy= instructorId,
                CreatedDate=DateTime.Now,
                ModifiedBy=Guid.Empty,
                DeletedBy= Guid.Empty,
            };
           var returnVal=await studentRepository.SaveStudentAttendence(attendance);
            if (returnVal is > 0)
                return ApiResponse<AttendenceResponseModel>.SuccessResponse(new AttendenceResponseModel
                {
                    AttendenceStatus = attendance.AttendenceStatus,
                    Date = attendance.AttendanceDate,
                    ScheduleId = attendance.ScheduleId,
                    StudentId = attendance.StudentId

                },"Attendece Saved Successfully");
            return ApiResponse<AttendenceResponseModel>.ErrorResponse(APIMessages.TechnicalError);
        }

        public async Task<bool> SendNotification(NotificationRequestModel request)
        {
            var instructorId = contextService.GetUserId();
            var batch = await instructorRepository.GetInstructorBatch(instructorId);
            var students = await batchRepository.GetAllStudentsByBatchId(batch.Id);
            var batchSchedule = await scheduleRepository.GetAllSchedulesByBatchId(batch.Id);
            var today = DateTimeOffset.UtcNow.Date;
            List<DateTimeOffset>? ScheduleDates = new List<DateTimeOffset>();
            foreach (var schedule in batchSchedule)
            {
                ScheduleDates.Add((DateTimeOffset)schedule.Date!);
            }
            List<string> emilAddresses = new List<string>();
            List<string> names= new List<string>();
            foreach (var student in students)
            {
                emilAddresses.Add (student.Email!);
                names.Add (student.Name!);
            }
            var todaysSchedule=ScheduleDates.Where(date=>date.Date==today).FirstOrDefault();
            var success = await emailHelperService.SendNotification(emilAddresses, names, request.Body!, request.Subject!, batch.BatchName!, todaysSchedule);

            return success;

        }

        public async Task<ApiResponse<InstructorResponseModel>> GetInstructorAcademy()
        {
            var instructorId = contextService.GetUserId();
            var instructor = await instructorRepository.GetByIdAsync(_ => _.Id==instructorId);
            if (instructor is null)
                return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.InstructorManagement.InstructorNotFound, HttpStatusCodes.NotFound);
            var returnVal = await instructorRepository.GetInstructorAcademy(instructorId);
            if (returnVal is not null)
                return ApiResponse<InstructorResponseModel>.SuccessResponse(returnVal);
            return ApiResponse<InstructorResponseModel>.ErrorResponse(APIMessages.TechnicalError);

        }

    }
}
