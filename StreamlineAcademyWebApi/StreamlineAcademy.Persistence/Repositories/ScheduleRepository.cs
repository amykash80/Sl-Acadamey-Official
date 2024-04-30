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
    public class ScheduleRepository : BaseRepository<Schedule>, IScheduleRepository
    {
        private readonly StreamlineDbContet context;

        public ScheduleRepository(StreamlineDbContet context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Schedule>> GetAsync(Expression<Func<Schedule, bool>> predicate)
        {
            return await context.Schedules
                .Include(s => s.Batch) 
                .Where(predicate)
                .ToListAsync();
        }
        public async Task<ScheduleResponseModel> GetScheduleById(Guid? id)
        {
            var schedule = await context.Schedules
                .Include(s => s.Batch)
                    .ThenInclude(b => b.Course)
                .Include(s => s.CourseContent)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (schedule is not null)
            {
                var response = new ScheduleResponseModel
                {
                    Id = schedule.Id,
                    Date = schedule.Date,
                    DurationInHours = schedule.DurationInHours,
                    BatchName = schedule.Batch!.BatchName, 
                    ContentName = schedule.CourseContent!.TaskName, 
                };

                return response;
            }
            return new ScheduleResponseModel(); 
        }


        public async Task<List<ScheduleResponseModel>> GetAllSchedules()
        {
            var schedules = await context.Schedules
                .Include(s => s.Batch)
                .Include(s => s.CourseContent)
                .Select(s => new ScheduleResponseModel
                {
                    Id = s.Id,
                    Date = s.Date,
                    DurationInHours = s.DurationInHours,
                    BatchName = s.Batch!.BatchName,
                    ContentName=s.CourseContent!.TaskName
                })
                .ToListAsync();

            return schedules;
        }
        public async Task<List<ScheduleResponseModel>> GetAllSchedulesByBatchId(Guid? batchId)
        {
            var schedules = await context.Schedules
                .Include(s => s.Batch)
                    .ThenInclude(b => b.Course) 
                .Include(s => s.CourseContent)
                .Where(s => s.BatchId == batchId)
                .Select(s => new ScheduleResponseModel
                {
                    Id = s.Id,
                    Date = s.Date,
                    DurationInHours = s.DurationInHours,
                    BatchName = s.Batch!.BatchName, 
                    ContentName = s.CourseContent!.TaskName, 
                })
                .ToListAsync();

            return schedules;
        }

    }
}
