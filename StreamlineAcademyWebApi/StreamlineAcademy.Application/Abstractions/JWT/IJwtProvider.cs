using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.JWT
{
    public interface IJwtProvider
    {
        public string GenerateToken(User user); 
    }
}
