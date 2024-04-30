using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class FileService : IFileService
    {
        private readonly IStorageService storageService;
        private readonly IFileRepository fileRepository; 
        public FileService(IStorageService storageService,
                           IFileRepository fileRepository)
        {
            this.storageService = storageService;
            this.fileRepository = fileRepository;
        }
        public async Task<string> UploadFileAsync(Module module, Guid entityId, IFormFile file)
        {
           var filePath=await storageService.UploadFileAsync(file);

            AppFiles appFiles = new AppFiles() { 
            
            Module=module,
            EntityId=entityId,
            FilePath= filePath,
            CreatedDate=DateTime.Now
            };

            var returnVal=await fileRepository.InsertAsync(appFiles);
            if (returnVal > 0)
                return filePath;
            return "No FilePath Found"; 
        }
    }
}
