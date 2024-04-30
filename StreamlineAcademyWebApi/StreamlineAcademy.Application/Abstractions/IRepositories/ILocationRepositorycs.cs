using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface ILocationRepository:IBaseRepository<Location>
    {
        Task<LocationResponseModel> GetLocationJoinById(Guid? id);
        Task<IEnumerable<LocationResponseModel>> GetAllLocations(Guid? id);
        Task<int> DeleteLocation(Location model);
    }
}
