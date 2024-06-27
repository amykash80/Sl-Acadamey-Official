using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class AcademyTypeRequestModel
    {
        public string? Name { get; set; } 
    }
    public class AcademyTypeUpdateModel
    {
        public Guid Id { get; set; }
        public string? AcademyTypeName { get; set; }
        public bool IsActive { get; set; }
    }

}
