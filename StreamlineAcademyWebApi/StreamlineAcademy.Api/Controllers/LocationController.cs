using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

namespace StreamlineAcademy.Api.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    [Authorize (Roles =nameof(UserRole.AcademyAdmin))]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;

        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }
        [HttpPost("add-new-location")]
        public async Task<ApiResponse<LocationResponseModel>> AddLocation(LocationRequestModel model)=>await locationService.AddLocation(model);
        [HttpGet("getAllLocations")]
        public async Task<ApiResponse<IEnumerable<LocationResponseModel>>> GetLocations() => await locationService.GetAllLocations();
        [HttpDelete("deleteLocation/{id:guid}")]
        public async Task<ApiResponse<LocationResponseModel>> DeleteLocation(Guid id) => await locationService.DeleteLocation(id);
        [HttpGet("getLocationById/{id:guid}")]
        public async Task<ApiResponse<LocationResponseModel>> GetLocationById(Guid id) => await locationService.DeleteLocation(id);
        [HttpPut("updateLocation")]
        public async Task<ApiResponse<LocationResponseModel>> UpdateLocation(LocationUpdateRequestModel model) => await locationService.UpdateLocation(model);


    }
}
