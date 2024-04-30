using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Enquiry:BaseModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; } 
        public string? PhoneNumber { get; set; }
		public RegistrationStatus RegistrationStatus { get; set; }=RegistrationStatus.Pending;

    }
}
