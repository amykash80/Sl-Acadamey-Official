using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface ILocationService
    {
        Task<ApiResponse<LocationResponseModel>> AddLocation(LocationRequestModel model);
        Task<ApiResponse<IEnumerable<LocationResponseModel>>> GetAllLocations();
        Task<ApiResponse<LocationResponseModel>> DeleteLocation(Guid id);
        Task<ApiResponse<LocationResponseModel>> GetLocationById(Guid id);
        Task<ApiResponse<LocationResponseModel>> UpdateLocation(LocationUpdateRequestModel model);

    }
}
