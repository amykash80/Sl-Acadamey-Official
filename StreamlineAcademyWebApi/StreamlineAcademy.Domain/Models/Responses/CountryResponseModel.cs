using StreamlineAcademy.Domain.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class CountryResponseModel : CountryRequestModel
    {
        public Guid? Id { get; set; } 
    }
     
}
