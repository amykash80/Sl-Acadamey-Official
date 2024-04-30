using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Utils
{
    public class ExtendedProblemDetails:ProblemDetails
    {
       public List<APIError> Errors { get; set; } = new List<APIError>();

    }
}
