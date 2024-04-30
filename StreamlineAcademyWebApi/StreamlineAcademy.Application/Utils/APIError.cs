using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Utils
{
    public sealed class APIError
    {
        public APIError()
        {

        }
        public APIError(string message)
        {
            Message = message;
        }
        public APIError(string message, string field)
            : this(message)
        {
            Field = field;
        }
        public string? Field { get; set; }
        public string? Message { get; set; }
    }
}
