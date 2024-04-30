using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class ScheduleRequestModel
    {
       
        [Required(ErrorMessage = "Date  is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTimeOffset? Date { get; set; }
        [Required(ErrorMessage = "DurationInHours is required.")]
        public int DurationInHours { get; set; }
        [Required(ErrorMessage = "Batch ID is required.")]
        public Guid? BatchId { get; set; }
        [Required(ErrorMessage = "CourseContent ID is required.")]
        public Guid? CourseContentId { get; set; }
    }

    public class ScheduleUpdateRequest : ScheduleRequestModel  // to update  response 
    {
        public Guid Id { get; set; }
    }
}
