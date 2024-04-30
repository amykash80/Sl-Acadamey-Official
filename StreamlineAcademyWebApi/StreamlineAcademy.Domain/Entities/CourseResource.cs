using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class CourseResource:BaseModel
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public  Enums.CourseResourceType? Type { get; set; }
        public string? FilePath { get; set; } 
        public Guid CourseId { get; set; }
        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }

    }
}
