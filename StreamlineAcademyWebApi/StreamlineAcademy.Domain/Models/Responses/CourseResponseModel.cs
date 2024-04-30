using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class CourseResponseModel
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? DurationInWeeks { get; set; }
        public string? CategoryName { get; set; }
        public string? AcademyName { get; set; }
        public int? Fee { get; set; }
        public bool IsActive { get; set; }
    }
}
