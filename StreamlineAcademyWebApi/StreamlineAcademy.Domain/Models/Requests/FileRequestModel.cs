using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Module = StreamlineAcademy.Domain.Enums.Module;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class FileRequestModel
    {
        public Module Module { get; set; }
        public IFormFile? File { get; set; }  
    }

}
