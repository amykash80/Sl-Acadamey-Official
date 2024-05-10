using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class CountryResponse
    {
        public Guid? Id { get; set; }
        public string? CountryName { get; set; }
    }
    public class StateResponse
    {
        public Guid? Id { get; set; }
        public string? StateName { get; set; }
        public Guid? CountryId { get;set; }
    }
    public class CityResponse
    {
        public Guid? Id { get; set; }
        public string? CityName { get; set; }
        public Guid? SateId { get; set; }


    }
}
