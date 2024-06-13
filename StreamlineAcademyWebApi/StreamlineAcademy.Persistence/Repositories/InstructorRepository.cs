using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Shared;
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
    public class InstructorRepository : IInstructorReository
    {
        private readonly StreamlineDbContet context;

        public InstructorRepository(StreamlineDbContet context)
        {
            this.context = context;
        }

        public Task<int> DeleteAsync(Instructor model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Instructor>> FindByAsync(Expression<Func<Instructor, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async Task<Instructor> FirstOrDefaultAsync(Expression<Func<Instructor, bool>> expression)
        {
            return await context.Instructors.FirstOrDefaultAsync(expression);

        }

        public Task<IEnumerable<Instructor>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Instructor> GetByIdAsync(Expression<Func<Instructor, bool>> expression)
        {
            return await context.Instructors.FirstOrDefaultAsync(expression);

        }

        public async Task<InstructorResponseModel> GetInstructorById(Guid? id)
        {

            var instructor = await context.Instructors
              .Include(a => a.User)
              .Include(a => a.Academy)
              .Include(a => a.Country)
              .Include(a => a.State)
              .Include(a => a.City)
              .FirstOrDefaultAsync(a => a.Id == id);

            if (instructor is not null)
            {

                var response = new InstructorResponseModel()
                {
                    Id = instructor.Id,
                    Name = instructor.User!.Name,
                    Email = instructor.User!.Email,
                    PhoneNumber = instructor.User.PhoneNumber,
                    PostalCode = instructor.User.PostalCode,
                    Address = instructor.User.Address,
                    WorkExperiance = instructor.WorkExperiance,
                    Skill = instructor.Skill,
                    AcademyName = instructor.Academy!.AcademyName,
                    DateOfBirth = instructor.DateOfBirth,
                    CountryName = instructor.Country!.CountryName,
                    StateName = instructor.State!.StateName,
                    CityName = instructor.City!.CityName,
                    IsActive = instructor.User.IsActive,
                    UserRole = instructor.User.UserRole,

                };

                return response;
            }
            return new InstructorResponseModel() { };

        }


        public async Task<List<InstructorResponseModel>> GetAllInstructors(Guid? id)
        {
            var instructors = await context.Instructors
                 .Where(a => a.AcademyId == id)
                .Include(a => a.User)
                .Include(a => a.Academy)
                .Include(a => a.Country)
                .Include(a => a.State)
                .Include(a => a.City)
                .Select(a => new InstructorResponseModel
                {
                    Id = a.Id,
                    Name = a.User!.Name,
                    Email = a.User!.Email,
                    PhoneNumber = a.User.PhoneNumber,
                    PostalCode = a.User.PostalCode,
                    Address = a.User.Address,
                    WorkExperiance = a.WorkExperiance,
                    DateOfBirth = a.DateOfBirth,
                    Skill = a.Skill,
                    AcademyName = a.Academy!.AcademyName,
                    CountryName = a.Country!.CountryName,
                    StateName = a.State!.StateName,
                    CityName = a.City!.CityName,
                    UserRole = a.User.UserRole,
                    IsActive = a.User.IsActive

                })
                .ToListAsync();

            return instructors;
        }

        public async Task<int> InsertAsync(Instructor model)
        {
            await context.Set<Instructor>().AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public Task<int> InsertRangeAsync(List<Instructor> models)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateAsync(Instructor model)
        {
            await context.Instructors.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> Delete(User model)
        {
            await Task.Run(() => context.Set<User>().Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CourseResponseModel>> GetAllIntructorCourses(Guid? id)
        {
            var courses = await context.Courses
          .Join(context.Batches,
          course => course.Id,
         batch => batch.CourseId,
         (course, batch) => new { Course = course, Batch = batch })
        .Where(x => x.Batch.InstructorId == id)
        .Select(x => new CourseResponseModel
        {
            Id = x.Course.Id,
            Name = x.Course.Name,
            Description = x.Course.Description,
            DurationInWeeks = x.Course.DurationInWeeks,
            AcademyName = x.Course.Academy!.AcademyName,
            CategoryName = x.Course.CourseCategory!.CategoryName,
            Fee = x.Course.Fee,
            IsActive = x.Course.IsActive,

        })
     .ToListAsync();

            return courses;

        }

        public async Task<List<InstructorBatchResponseModel>> GetInstructorBatches(Guid? instructorId)
        {
            var batches = await context.Batches
      .Include(a => a.Course)
      .Include(a => a.Location)
      .Where(a => a.InstructorId == instructorId)
      .ToListAsync();

            if (batches.Any())
            {
                var resBatches = batches.Select(batch => new InstructorBatchResponseModel()
                {
                    Id = batch.Id,
                    BatchName = batch.BatchName,
                    BatchSize = batch.BatchSize,
                    StartDate = batch.StartDate,
                    EndDate = batch.EndDate,
                    IsActive= batch.IsActive,
                   
                    CourseName = batch.Course != null ? batch.Course.Name : string.Empty,
                    LocationName = batch.Location != null ? batch.Location.Address : string.Empty
                }).ToList();

                return resBatches;
            }
            return new List<InstructorBatchResponseModel>() { };
        }
        public async Task<InstructorResponseModel> GetInstructorAcademy(Guid? academyId)
        {
            var instructor = await context.Instructors
                .Include(i => i.User)
                .Include(i => i.Academy)
                .Include(i => i.Country)
                .Include(i => i.State)
                .Include(i => i.City)
                .FirstOrDefaultAsync(i => i.Id == academyId);

            if (instructor is not null)
            {
                return new InstructorResponseModel
                {
                    Id = instructor.Id,
                    Name = instructor.User!.Name,
                    Email = instructor.User!.Email,
                    PhoneNumber = instructor.User!.PhoneNumber,
                    PostalCode = instructor.User!.PostalCode,
                    Address = instructor.User!.Address,
                    Skill = instructor.Skill,
                    AcademyName = instructor.Academy!.AcademyName,
                    DateOfBirth = instructor.DateOfBirth,
                    CountryName = instructor.Country!.CountryName,
                    StateName = instructor.State!.StateName,
                    CityName = instructor.City!.CityName,
                    IsActive = instructor.User.IsActive,
                    UserRole = instructor.User.UserRole
                };
            }

            return new InstructorResponseModel();
        }

        public async Task<InstructorBatchResponseModel> GetInstructionBatchByCourseId(Guid? instructorId)
        {
            var batch = await context.Batches
     .Include(a => a.Course)
     .Include(a => a.Location)
    .FirstOrDefaultAsync(a => a.InstructorId == instructorId);

            if (batch is not null)
            {
                var resBatch = new InstructorBatchResponseModel()
                {
                    Id = batch.Id,
                    BatchName = batch.BatchName,
                    BatchSize = batch.BatchSize,
                    StartDate = batch.StartDate,
                    EndDate = batch.EndDate,
                    CourseName = batch!.Course!.Name,
                    LocationName = batch.Location!.Address
                };
                return resBatch;
            }
            return new InstructorBatchResponseModel() { };
        }

        public async Task<List<StudentResponseModel>> GetAllStudentsForInstructorAsync(Guid? instructorId)
        {
            var students = await context.Batches
          .Where(b => b.InstructorId == instructorId)
          .SelectMany(b => b.StudentBatches!)
          .Include(sb => sb.Student)
          .ThenInclude(s => s.User)
          .Include(sb => sb.Student!.Academy)
          .Select(sb => new StudentResponseModel
          {
              Id = sb.Id,
              Name = sb.Student!.User!.Name,
              Address = sb.Student.User!.Address,
              PhoneNumber = sb.Student.User!.PhoneNumber,
              Email = sb.Student.User!.Email,
              AcademyName = sb.Student!.Academy!.AcademyName,
              IsActive = sb.Student.User.IsActive,
              BatchName=sb.Batch!.BatchName
              
          })
          .ToListAsync();

            return students!;
        }
        public async Task<List<ScheduleResponseModel?>> GetInstructorSchedule(Guid? instructorId)
        {
            //var batch = context.Batches.Where(b => b.InstructorId == instructorId).Include(sch => sch.Schedules);
            //var allSchedules = batch.SelectMany(b => b.Schedules!);
            //var schedule = await context.Batches
            //    .Where(b => b.InstructorId == instructorId)
            //    .SelectMany(b => b.Schedules!)
            //    .Select(sb => new ScheduleResponseModel
            //    {
            //        Id = sb.Id,
            //        Date = sb.Date,
            //        DurationInHours = sb.DurationInHours,
            //        IsActive = sb.IsActive,
            //        BatchName = sb.Batch!.BatchName  
            //    })
            //    .FirstOrDefaultAsync();  

            //return schedule;
            var schedules = await context.Batches
        .Where(b => b.InstructorId == instructorId)
        .SelectMany(b => b.Schedules!)
        .Select(sb => new ScheduleResponseModel
        {
            Id = sb.Id,
            Date = sb.Date,
            DurationInHours = sb.DurationInHours,
            IsActive = sb.IsActive,
            BatchName = sb.Batch!.BatchName // Assuming sb.Batch is not null due to the SelectMany
        })
        .ToListAsync();

            return schedules!;
        }



    }
}

