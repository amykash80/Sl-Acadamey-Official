using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class CourseContentResponseModel
    {
        public Guid? Id { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
        public string? CourseName { get; set; }
    }
}
