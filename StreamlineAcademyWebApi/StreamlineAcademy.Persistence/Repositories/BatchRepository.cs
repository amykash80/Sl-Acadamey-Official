using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class BatchRepository : BaseRepository<Batch>, IBatchRepository
    {
        private readonly StreamlineDbContet context;

        public BatchRepository(StreamlineDbContet context) : base(context)
        {
            this.context = context;
        }

        public async Task<BatchResponseModel> GetBatchById(Guid? id)
        {
            var batch = await context.Batches
              .Include(a => a.Course)
              .Include(a => a.Instructor!.User)
              .Include(a => a.Location)
              .FirstOrDefaultAsync(a => a.Id == id);

            if (batch is not null)
            {

                var response = new BatchResponseModel
                {
                    Id = batch.Id,
                    BatchName = batch.BatchName,
                    BatchSize = batch.BatchSize,
                    StartDate = batch.StartDate,
                    EndDate = batch.EndDate,
                    CourseName = batch.Course?.Name,
                    InstructorName = batch.Instructor?.User?.Name,
                    LocationName = batch.Location?.Address
                };

                return response;
            }
            return new BatchResponseModel() { };
        }

        public async Task<List<BatchResponseModel>> GetAllBatches()
        {
            var batch = await context.Batches
              .Include(a => a.Course)
              .Include(a => a.Instructor!.User)
              .Include(a => a.Location)
                .Select(a => new BatchResponseModel
                {
                    Id = a.Id,
                    BatchName = a.BatchName,
                    BatchSize = a.BatchSize,
                    StartDate = a.StartDate,
                    EndDate = a.EndDate,
                    CourseName = a.Course!.Name,
                    InstructorName = a.Instructor!.User!.Name,
                    LocationName = a.Location!.Address
                })
                .ToListAsync();

            return batch;
        }

        public async Task<List<BatchResponseModel>> GetAllBatchByCourseId(Guid? courseId)
        {
            var batches = await context.Batches
                .Include(b => b.Course)
                .Include(b => b.Instructor)
                .Include(b => b.Location)
                .Where(b => b.CourseId == courseId)
                .Select(b => new BatchResponseModel
                {
                    Id = b.Id,
                    BatchName = b.BatchName,
                    BatchSize = b.BatchSize,
                    StartDate = b.StartDate,
                    EndDate = b.EndDate,
                    CourseName = b.Course!.Name,
                    InstructorName = b.Instructor!.User!.Name,
                    LocationName = b.Location!.Address,

                })
                .ToListAsync();

            return batches;
        }
        public async Task<List<StudentByBatchResponseModel>> GetAllStudentsByBatchId(Guid? batchId)
        {
            var students = await context.StudentBatches
        .Where(sb => sb.BatchId == batchId)
        .Include(sb => sb.Student) 
        .Select(sb => new StudentByBatchResponseModel
        {
            Id=sb.Id,
            Name=sb.Student!.User!.Name,
            Address=sb.Student.User!.Address,
            PhoneNumber=sb.Student.User!.PhoneNumber,
            Email=sb.Student.User!.Email,
            AcademyName=sb.Student!.Academy!.AcademyName

         })
        .ToListAsync(); 
         return students!;
        }

        public async Task<List<BatchResponseModel>> GetBatchesByInstructorId(Guid? instructorId)
        {
            var batches = await context.Batches
                .Include(a => a.Course)
                .Include(a => a.Instructor!.User)
                .Include(a => a.Location)
                .Where(a => a.InstructorId == instructorId)
                .ToListAsync();

            return batches.Select(batch => new BatchResponseModel
            {
                Id = batch.Id,
                BatchName = batch.BatchName,
                BatchSize = batch.BatchSize,
                StartDate = batch.StartDate,
                EndDate = batch.EndDate,
                CourseName = batch.Course?.Name,
                InstructorName = batch.Instructor?.User?.Name,
                LocationName = batch.Location?.Address
            }).ToList();
        }

    }
}
