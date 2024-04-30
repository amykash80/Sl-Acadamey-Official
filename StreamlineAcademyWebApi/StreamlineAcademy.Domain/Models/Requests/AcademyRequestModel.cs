using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class AcademyRequestModel
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(40, ErrorMessage = "Name must not exceed 40 characters.")]
        public string? Name { get; set; } 
        [Required(ErrorMessage = "AcademyName is required")]
        [StringLength(40, ErrorMessage = "Name must not exceed 40 characters.")]
        public string? AcademyName { get; set; } 
        [Required(ErrorMessage = "Address is required")]
        public string? Address { get; set; } 
        [Required(ErrorMessage = "PostalCode is required")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "PostalCode must contain only numbers")]
        [StringLength(8, ErrorMessage = "PostalCode must not exceed 8 characters.")]
        public string? PostalCode { get; set; }
        [Required(ErrorMessage = "PhoneNumber is required")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "please enter valid phone number ")]
        public string? PhoneNumber { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [RegularExpression("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", ErrorMessage = "Please enter valid Email")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Academy Type Id is required")]
        public Guid AcademyTypeId { get; set; }
        [Required(ErrorMessage = "Country  Id is required")]
        public Guid CountryId { get; set; }
        [Required(ErrorMessage = "State  Id is required")]
        public Guid StateId { get; set; }
        [Required(ErrorMessage = "City  Id is required")]
        public Guid CityId { get; set; } 
    }

    public class AcademyUpdateRequest : AcademyRequestModel
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }

    }


}
