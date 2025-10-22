using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class PaymentRequestModel
    {
        public double Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
    }

}

