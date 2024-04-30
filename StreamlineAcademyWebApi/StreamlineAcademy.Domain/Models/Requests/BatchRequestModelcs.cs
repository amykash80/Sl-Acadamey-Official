using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class BatchRequestModel
    {
        [Required(ErrorMessage = "BatchName is required")]
        [MaxLength(40, ErrorMessage = "Name must not exceed 40 characters")]
        public string? BatchName { get; set; }

        [Required(ErrorMessage = "BatchSize is required")]
        [Range(1, int.MaxValue, ErrorMessage = "BatchSize must be greater than 0")]
        public int? BatchSize { get; set; }

        [Required(ErrorMessage = "StartDate is required")]
        public DateTimeOffset StartDate { get; set; }

        [Required(ErrorMessage = "EndDate is required")]
        public DateTimeOffset EndDate { get; set; }

        [Required(ErrorMessage = "CourseId is required")]
        public Guid CourseId { get; set; }

        [Required(ErrorMessage = "InstructorId is required")]
        public Guid InstructorId { get; set; }

        [Required(ErrorMessage = "LocationId is required")]
        public Guid LocationId { get; set; }
    }

    public class BatchUpdateRequest : BatchRequestModel  // to update  response 
    {
        public Guid Id { get; set; }
    }
}
