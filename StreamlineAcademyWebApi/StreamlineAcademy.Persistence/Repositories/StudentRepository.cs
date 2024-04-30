using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StreamlineDbContet context;

        public StudentRepository(StreamlineDbContet context)
        {
            this.context = context;
        }

        public Task<int> DeleteAsync(Student model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Student>> FindByAsync(Expression<Func<Student, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<Student> FirstOrDefaultAsync(Expression<Func<Student, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Student>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Student> GetByIdAsync(Expression<Func<Student, bool>> expression)
        {
            return await context.Students.FirstOrDefaultAsync(expression);

        }

        public async Task<StudentResponseModel> GetStudentById(Guid? id)
        {

            var student = await context.Students
              .Include(a => a.User)
              .Include(a => a.Academy)
              .Include(a => a.Country)
              .Include(a => a.State)
              .Include(a => a.City)
              .FirstOrDefaultAsync(a => a.Id == id);

            if (student is not null)
            {
                var studentsInterests = await context.StudentInterests
                     .Where(a => a.StudentId == id)
                     .Include(a => a.Course)
                    .Select(a => a.Course!.Name)
                    .ToListAsync();
                var response = new StudentResponseModel()
                {
                    Id = student.Id,
                    Name = student.User!.Name,
                    Email = student.User!.Email,
                    PhoneNumber = student.User.PhoneNumber,
                    PostalCode = student.User.PostalCode,
                    Address = student.User.Address,
                    DateOfBirth = student.DateOfBirth,
                    CountryName = student.Country!.CountryName,
                    AcademyName = student.Academy!.AcademyName,
                    IntrestedIn = studentsInterests!,
                    StateName = student.State!.StateName,
                    CityName = student.City!.CityName,
                    IsActive = student.User.IsActive,
                    UserRole = student.User.UserRole,

                };

                return response;
            }
            return new StudentResponseModel() { };

        }


        public async Task<List<StudentResponseModel>> GetAllStudents(Guid? id)
        {
            var students = await context.Students
                 .Where(a => a.AcademyId == id)
                .Include(a => a.User)
                .Include(a => a.Academy)
                .Include(a => a.Country)
                .Include(a => a.State)
                .Include(a => a.City)
                .Select(a => new StudentResponseModel
                {
                    Id = a.Id,
                    Name = a.User!.Name,
                    Email = a.User!.Email,
                    PhoneNumber = a.User.PhoneNumber,
                    PostalCode = a.User.PostalCode,
                    Address = a.User.Address,
                    DateOfBirth = a.DateOfBirth,
                    AcademyName = a.Academy!.AcademyName,
                    CountryName = a.Country!.CountryName,
                    StateName = a.State!.StateName,
                    CityName = a.City!.CityName,
                    UserRole = a.User.UserRole,
                    IsActive = a.User.IsActive,

                })
                .ToListAsync();

            return students;
        }

        public async Task<int> InsertAsync(Student model)
        {
            await context.Set<Student>().AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> InsertRangeAsync(List<StudentInterests> models)
        {
            await context.StudentInterests.AddRangeAsync(models);
            return await context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(Student model)
        {
            await context.Students.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> Delete(User model)
        {
            await Task.Run(() => context.Set<User>().Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddStudentBatch(StudentBatch model)
        {
            await context.StudentBatches.AddAsync(model);
            return await context.SaveChangesAsync();
        }


        public async Task<List<StudentInterests>> GetStudentInterestsByStudentId(Guid? studentId)
        {
            return await context.StudentInterests
            .Where(a => a.StudentId == studentId)
           .ToListAsync();
        }

        public async Task<IEnumerable<StudentBatchResponseModel>> GetStudentWithBatchDetails(Guid? studentId)
        {
            var batches = await context.StudentBatches
          .Where(a => a.StudentId == studentId)
          .Select(a => new
          {
              a.BatchId,

          })
        .ToListAsync();

            var response = new List<StudentBatchResponseModel>();
            foreach (var batch in batches)
            {
                var batchDetails = await context.Batches
                    .Include(b => b.Course)
                    .Include(b => b.Instructor)
                        .ThenInclude(i => i.User)
                    .Include(b => b.Location)
                    .Include(b => b.Schedules)
                    .FirstOrDefaultAsync(b => b.Id == batch.BatchId);

                if (batchDetails is not null)
                {
                    var responseModel = new StudentBatchResponseModel
                    {
                        StudenId = studentId,
                        BatchName = batchDetails.BatchName,
                        BatchSize = batchDetails.BatchSize,
                        StartDate = batchDetails.StartDate,
                        EndDate = batchDetails.EndDate,
                        CourseName = batchDetails!.Course!.Name,
                        InstructorName = batchDetails!.Instructor!.User!.Name,
                        LocationName = batchDetails!.Location!.Address,
                        Schedules = batchDetails!.Schedules!.Select(a => new ScheduleResponseModel
                        {
                            Id = a.Id,
                            Date = a.Date,
                            DurationInHours = a.DurationInHours,
                            BatchName = batchDetails!.BatchName
                        })
                    };
                    response.Add(responseModel);
                }
            }

            return response;

        }

      
        public async Task<IEnumerable<ScheduleResponseModel>> GetStudentSchedules(Guid? studentId)
        {
            var schedules = await context.StudentBatches
                .Where(sb => sb.StudentId == studentId)
                .SelectMany(sb => sb.Batch!.Schedules!.Select(s => new ScheduleResponseModel
                {
                    Id = s.Id,
                    Date = s.Date,
                    DurationInHours = s.DurationInHours,
                    BatchName = sb.Batch.BatchName,
                    ContentName = s.CourseContent!.TaskName 
                }))
                .ToListAsync();

            return schedules;
        }

        public async Task<int> SaveStudentAttendence(Attendance attendance)
        {
            await context.Attendances.AddAsync(attendance);
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Attendance>> checkMyAttendences(Guid? studentId)
        {
            return await context.Attendances.Where(a => a.StudentId == studentId).ToListAsync();
        }

        public Task<ScheduleResponseModel> CheckMyTodaysSchedule(Guid? StudentId)
        {
            throw new NotImplementedException();
        }
    }
}
