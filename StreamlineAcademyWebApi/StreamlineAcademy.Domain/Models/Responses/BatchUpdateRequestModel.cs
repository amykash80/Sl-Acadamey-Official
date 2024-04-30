using StreamlineAcademy.Domain.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class BatchUpdateRequestModel:BatchRequestModel
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
    }
}
