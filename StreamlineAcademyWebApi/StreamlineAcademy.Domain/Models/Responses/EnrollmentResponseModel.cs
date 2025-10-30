using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class EnrollmentResponseModel
    {
        public Guid Id { get; set; }
        public string StudentName { get; set; }
        public string CourseTitle { get; set; }
        public DateTimeOffset EnrollmentDate { get; set; }
        public bool IsActive { get; set; }
    }

}
