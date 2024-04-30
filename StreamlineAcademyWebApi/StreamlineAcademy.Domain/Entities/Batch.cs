using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Batch:BaseModel
    {
       
        public string? BatchName { get; set; }
        public int? BatchSize { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public Guid CourseId { get; set; }
        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }
        public Guid InstructorId { get; set; }
        [ForeignKey(nameof(InstructorId))]
        public Instructor? Instructor { get; set; }
        public Guid LocationId { get; set; }
        [ForeignKey(nameof(LocationId))]
        public Location? Location { get; set; }
        #region Navigation 
        public ICollection<Schedule>? Schedules { get; set; }
        public ICollection<Student>? Students { get; set; }
        public ICollection<Attendance>? Attendances { get; set; }

        #endregion

    }
}
