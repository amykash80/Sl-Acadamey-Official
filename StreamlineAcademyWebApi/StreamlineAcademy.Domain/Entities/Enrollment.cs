using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Enrollment:BaseModel
    {
        public Guid StudentId { get; set; }
        public Guid CourseId { get; set; }
        public DateTimeOffset EnrollmentDate { get; set; }

        [ForeignKey(nameof(StudentId))]
        public Student? Student { get; set; }

        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }
    }
}
