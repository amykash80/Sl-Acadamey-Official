using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CityRequestModel
    {        
        public string? CityName { get; set; } 
        public Guid? StateId { get; set; } 
    }
}
