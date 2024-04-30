using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class CourseCategory:BaseModel
    {
        public string? CategoryName { get; set; }
        public ICollection<Course>? Courses { get; set; }
    }
}
