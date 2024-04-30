using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class AcademyResponseModel
    { 
            public Guid? Id { get; set; }
            public string? AcademyAdmin { get; set; }
            public string? AcademyName { get; set; } 
            public string? Address { get; set; } 
            public string? PostalCode { get; set; } 
            public string? PhoneNumber { get; set; } 
            public string? Email { get; set; } 
            public string? AcademyType { get; set; } 
            public string? CountryName { get; set; } 
            public string? StateName { get; set; } 
            public string? CityName { get; set; } 
            public bool IsActive { get; set; }
            public UserRole UserRole { get; set; } 
    }
}
