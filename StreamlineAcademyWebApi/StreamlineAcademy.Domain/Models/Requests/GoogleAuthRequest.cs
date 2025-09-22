using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class GoogleAuthRequest
    {
        public string ClientId { get; set; }=string.Empty;
        public string Code { get; set; }=string.Empty;
        public string Redirect_Uri { get; set; } = string.Empty;

    }
}
