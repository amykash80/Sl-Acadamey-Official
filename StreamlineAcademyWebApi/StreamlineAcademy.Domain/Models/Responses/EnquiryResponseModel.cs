using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class EnquiryResponseModel : EnquiryRequestModel // to send response to clint
    {
        public Guid? Id { get; set; }
        public RegistrationStatus RegistrationStatus { get; set; } 
        public bool IsActive { get; set; }
    }
}
