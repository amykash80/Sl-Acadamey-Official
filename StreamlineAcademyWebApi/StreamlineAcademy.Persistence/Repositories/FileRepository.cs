using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class FileRepository:BaseRepository<AppFiles>,IFileRepository
    {
        public FileRepository(StreamlineDbContet context):base(context) 
        {
            
        }
    }
}
