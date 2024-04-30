using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CourseResourceRequestModel
    {
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "Course Type is required")]
        public Domain.Enums.CourseResourceType? Type { get; set; }
        [Required(ErrorMessage = "CourseId is required")]
        public Guid CourseId { get; set; }
        public IFormFile? File { get; set; }

    }
    public class CourseResourceUpdateRequest : CourseResourceRequestModel  // to update  response 
    {
        public Guid Id { get; set; }
    }
}
