using Microsoft.AspNetCore.Http;
using Org.BouncyCastle.Asn1.Ocsp;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository locationRepository;
        private readonly IContextService contextService;

        public LocationService(ILocationRepository locationRepository,
                               IContextService contextService)
        {
            this.locationRepository = locationRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<LocationResponseModel>> AddLocation(LocationRequestModel model)
        {
            if (await locationRepository.FirstOrDefaultAsync(x => x.Address == model.Address) is not null)
                return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.LocationManagement.LocationAlreadyRegistered, HttpStatusCodes.Conflict);

            var academyId=contextService.GetUserId();
            var location = new Location()
            {
                Address = model.Address,
                PostalCode = model.PostalCode,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                AcademyId= academyId,
                CountryId=model.CountryId,
                StateId=model.StateId,
                CityId=model.CityId,
                IsActive=true,
                CreatedBy = academyId,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                DeletedBy = Guid.Empty,
                DeletedDate = DateTime.Now,
            };
            var res = await locationRepository.InsertAsync(location);
            if (res > 0)
            {
                var locationResponse = await locationRepository.GetLocationJoinById(location.Id);
                return ApiResponse<LocationResponseModel>.SuccessResponse(locationResponse, APIMessages.LocationManagement.LocationAdded);
            }
            return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<LocationResponseModel>> DeleteLocation(Guid id)
        {
            var existingLocation = await locationRepository.GetByIdAsync(x => x.Id == id);

            if (existingLocation is null)
                return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.LocationManagement.LocationNotFound, HttpStatusCodes.NotFound);

            var result = await locationRepository.FirstOrDefaultAsync(x => x.Id == existingLocation.Id);
            result.IsActive = false;
            result.DeletedDate = DateTime.Now;
            if (result is not null)
            {
                int isSoftDelted = await locationRepository.DeleteLocation(result);
                if (isSoftDelted > 0)
                {
                    var returnVal = await locationRepository.GetLocationJoinById(existingLocation.Id);
                    return ApiResponse<LocationResponseModel>.SuccessResponse(returnVal, APIMessages.LocationManagement.LocationDeleted);
                }
            }
            return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }

        public async Task<ApiResponse<IEnumerable<LocationResponseModel>>> GetAllLocations()
        {
            var academyId = contextService.GetUserId();
            var locationList =await locationRepository.GetAllLocations(academyId);
            if (locationList is not null)
                return ApiResponse<IEnumerable<LocationResponseModel>>.SuccessResponse(locationList.ToList().OrderBy(_ => _.Address), $"Found {locationList.Count()} Locations");
                return ApiResponse<IEnumerable<LocationResponseModel>>.ErrorResponse(APIMessages.LocationManagement.LocationNotFound, HttpStatusCodes.NotFound);

        }

        public async Task<ApiResponse<LocationResponseModel>> GetLocationById(Guid id)
        {
            var location = await locationRepository.GetByIdAsync(x => x.Id == id);
            if (location is null)
                return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.LocationManagement.LocationNotFound, HttpStatusCodes.NotFound);

            var responseModel = await locationRepository.GetLocationJoinById(id);

            return ApiResponse<LocationResponseModel>.SuccessResponse(responseModel);
        }

        public async Task<ApiResponse<LocationResponseModel>> UpdateLocation(LocationUpdateRequestModel model)
        {
            var academyId = contextService.GetUserId();
            var location = await locationRepository.GetByIdAsync(x => x.Id == model.Id);
            if (location is null)
                return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.LocationManagement.LocationNotFound, HttpStatusCodes.NotFound);

            location.Address = model.Address;
            location.PostalCode = model.PostalCode;
            location.Latitude = model.Latitude;
            location.Longitude = model.Longitude;
            location.CountryId = model.CountryId;
            location.StateId = model.StateId;
            location.CityId = model.CityId;
            location.ModifiedDate=DateTime.Now;
            location.ModifiedBy = academyId;
            var locationResponse = await locationRepository.UpdateAsync(location);
            if (locationResponse is > 0)
            {
                var responseModel = await locationRepository.GetLocationJoinById(location.Id);
                return ApiResponse<LocationResponseModel>.SuccessResponse(responseModel, APIMessages.LocationManagement.LocationUpdated);
            }
            return ApiResponse<LocationResponseModel>.ErrorResponse(APIMessages.TechnicalError, HttpStatusCodes.InternalServerError);
        }
    }
}

