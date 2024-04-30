using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class LoginResponseModel
    {
        public string? FullName { get; set; } 
        public UserRole UserRole { get; set; }
        public string? Token { get; set; } 
    }
}
