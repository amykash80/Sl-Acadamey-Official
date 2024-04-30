using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class InstructorResponseModel
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public int WorkExperiance { get; set; }
        public Skill Skill { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string? CountryName { get; set; }
        public string? StateName { get; set; }
        public string? CityName { get; set; }
        public string? AcademyName { get; set; }
        public UserRole UserRole { get; set; }
        public bool IsActive { get; set; }
    }
}
