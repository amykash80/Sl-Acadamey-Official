using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class CourseResourceResponseModel
    {
        public Guid? Id { get; set; }    
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? FilePath { get; set; }
        public CourseResourceType? Type { get; set; }  
        public string? CourseName { get; set; }

    }
}
