using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class User:BaseModel
    { 
        public string? Name { get; set; } 
        public string? Address { get; set; } 
        public string? PostalCode { get; set; } 
        public string? PhoneNumber { get; set; } 
        public string? Email { get; set; } 
        public string? Password { get; set; } 
        public string? Salt { get; set; } 
        public UserRole UserRole { get; set; }
        public string? ResetCode { get; set; }
        public DateTimeOffset? ResetExpiry { get; set; }

        #region navigation
        public Academy? Academy { get; set; } 
        public Instructor? Instructor { get; set; }
		#endregion
	}
}
