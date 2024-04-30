using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(Module module,Guid entityId,IFormFile file);
    }
}
