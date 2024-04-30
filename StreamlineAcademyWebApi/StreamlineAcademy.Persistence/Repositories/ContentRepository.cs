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
    public class ContentRepository:BaseRepository<CourseContent>,IContentRepository
    {
        private readonly StreamlineDbContet context;

        public ContentRepository(StreamlineDbContet context):base(context) 
        {
            this.context = context;
        }
        public async Task<List<CourseContentResponseModel>> GetAllContentByCourseId(Guid courseId)
        {
            var contents = await context.CourseContents
       .Where(c => c.CourseId == courseId)
       .Select(c => new CourseContentResponseModel
       {
           Id = c.Id,
           TaskName = c.TaskName,
           Description = c.Discription,
           Duration = c.DurationInHours,
           CourseName=c.Course!.Name,
           
       })
       .ToListAsync();

            return contents;
        }
    }
}
