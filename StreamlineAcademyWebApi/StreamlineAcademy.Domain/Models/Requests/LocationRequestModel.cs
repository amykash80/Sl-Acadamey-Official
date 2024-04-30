using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class LocationRequestModel
    {
        [Required(ErrorMessage = "LocationName is required")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "PostalCode is required")]
        [MinLength(6, ErrorMessage = "PostalCode must be at least 6 characters")]
        public string? PostalCode { get; set; }

        [Required(ErrorMessage = "Latitude is required")]
        [Range(-90, 90, ErrorMessage = "Latitude must be between -90 and 90")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "Longitude is required")]
        [Range(-180, 180, ErrorMessage = "Longitude must be between -180 and 180")]
        public double Longitude { get; set; }

        [Required(ErrorMessage = "CountryId is required")]
        public Guid CountryId { get; set; }

        [Required(ErrorMessage = "StateId is required")]
        public Guid StateId { get; set; }

        [Required(ErrorMessage = "CityId is required")]
        public Guid CityId { get; set; }

     
    }
}
