using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class AttendenceRequestModel
    {
        [Required(ErrorMessage = "Attendence Date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTimeOffset AttendanceDate { get; set; }
        [Required(ErrorMessage = "Attendence Status is required")]
        public AttendenceStatus AttendenceStatus { get; set; }
        [Required(ErrorMessage = "StudentId is required")]
        public Guid StudentId { get; set; }
        [Required(ErrorMessage = "ScheduleId is required")]
        public Guid ScheduleId { get; set; }
    }
}
