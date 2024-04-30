using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Application.Abstractions.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class StorageService : IStorageService
    {
        private readonly string webRootPath; 
        public StorageService(string WebRootPath)
        {
            webRootPath = WebRootPath;
        }
        public async Task<string> UploadFileAsync(IFormFile file)
        {
            // Get Physical Path of Wwwroot folder
            var path = GetPhysicalPath();  
            if(!Directory.Exists(path))
                Directory.CreateDirectory(path);

            // change file name to save it more securely

            var fileName=string.Concat(Guid.NewGuid().ToString(), file.FileName); 

            var fullPath= Path.Combine(path, fileName);

            using FileStream fs = new FileStream(fullPath, FileMode.Create);

            await file.CopyToAsync(fs);

            return string.Concat(GetVirtualPath(), fileName);
        }

        #region helperFunctions 
        private string GetPhysicalPath() => Path.Combine(webRootPath, "Files"); 
        private string GetVirtualPath() => "/Files/";
        #endregion
    }
}
