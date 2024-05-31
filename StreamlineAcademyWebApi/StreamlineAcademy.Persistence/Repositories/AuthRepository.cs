using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Shared;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class AuthRepository:BaseRepository<User>, IAuthRepository
    {
        private readonly StreamlineDbContet context;

        public AuthRepository(StreamlineDbContet context):base(context)
        {
            this.context = context;
        }

        public async Task<string> getProfilePhoto(Guid? id)
        {
            if (id == null)
            {
                return null!;
            }

            var path = await context.AppFiles
                .Where(x => x.EntityId == id)
                .Select(x => x.FilePath)
                .FirstOrDefaultAsync();

            return path!;
        }
    }
}
