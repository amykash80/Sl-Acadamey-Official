using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class StateRequestModel
    {
            public string? StateName { get; set; } 
            public Guid? CountryId { get; set; } 
    }
}
