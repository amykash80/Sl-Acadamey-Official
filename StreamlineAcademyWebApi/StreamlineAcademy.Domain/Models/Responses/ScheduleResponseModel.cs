using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class ScheduleResponseModel
    {
        public Guid? Id { get; set; }
        public DateTimeOffset? Date { get; set; }
        public int DurationInHours { get; set; }
        public string? BatchName { get; set; }
        public string? ContentName { get; set; }
    }
}
