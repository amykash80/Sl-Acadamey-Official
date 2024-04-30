//using StreamlineAcademy.Application.RRModels;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IAuthRepository:IBaseRepository<User>
    {
       

    }
}
