using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class AttendenceResponseModel
    {
        public Guid? StudentId { get; set; }
        public DateTimeOffset Date { get; set; }
        public Guid? ScheduleId { get; set; }
        public AttendenceStatus AttendenceStatus { get; set; }
    }
}
