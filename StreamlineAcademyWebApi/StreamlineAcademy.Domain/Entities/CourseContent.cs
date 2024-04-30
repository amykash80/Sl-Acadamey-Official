using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class CourseContent:BaseModel
    {
        public string? TaskName { get; set; }
        public string? Discription { get; set; }
        public int DurationInHours { get; set; }
        public Guid? CourseId { get; set; }
        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }


    }
}
