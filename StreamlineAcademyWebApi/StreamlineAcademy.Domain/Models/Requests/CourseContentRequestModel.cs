using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CourseContentRequestModel
    {  
        [Required(ErrorMessage = "Task name is required")]
        public string? TaskName { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Duration is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be greater than zero")]
        public int Duration { get; set; }
        [Required(ErrorMessage = "CourseId is required")]
        public Guid? CourseId { get; set; } 
    }

    public class CourseContentUpdateRequest : CourseContentRequestModel  // to update  response 
    {
        public Guid Id { get; set; }
    }
}
