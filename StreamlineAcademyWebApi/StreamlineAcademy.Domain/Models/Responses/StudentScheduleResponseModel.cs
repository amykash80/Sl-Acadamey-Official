using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class StudentBatchResponseModel
    {
        public Guid? StudenId { get; set; }
        public string? BatchName { get; set; }
        public int? BatchSize { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string? CourseName { get; set; }
        public string? InstructorName { get; set; }
        public string? LocationName { get; set; }
        public IEnumerable<ScheduleResponseModel>? Schedules { get; set; }
    }
    public class StudentCourseResponseModel
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }

        public string? Address { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public string? CourseName { get; set; }
        public BatchStatus BatchStatus { get; set; }
    }
}
