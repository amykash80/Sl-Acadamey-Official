﻿using Microsoft.AspNetCore.Http;
using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IFileRepository:IBaseRepository<AppFiles>
    {

    }
}
