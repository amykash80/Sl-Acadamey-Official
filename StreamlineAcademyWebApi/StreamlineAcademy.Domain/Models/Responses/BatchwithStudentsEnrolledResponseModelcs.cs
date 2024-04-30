using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class SchedulewithStudentsEnrolledResponseModel
    {
        public string? ScheduleId { get; set; }
        public string? BatchName { get; set; }  
        public List<Student>? EnrolledStudents { get; set; }
    }
}
