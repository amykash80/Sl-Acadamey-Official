using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CourseRequestModel
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(40, ErrorMessage = "Name must not exceed 40 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Duration in weeks is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be a positive integer")]
        public int? DurationInWeeks { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Fee must be a non-negative integer")]
        public int? Fee { get; set; }

        [Required(ErrorMessage = "CategoryId is required")]
        public Guid? CategoryId { get; set; }
        [Required(ErrorMessage = "AcademyId is required")]
        public Guid? AcademyId { get; set; }
    }
    public class CourseUpdateRequest : CourseRequestModel  // to update  response 
    {
        public Guid Id { get; set; }
    }
}

