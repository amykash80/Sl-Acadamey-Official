using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CountryRequestModel
    {
        public string? CountryName { get; set; }  
    }
    
}
