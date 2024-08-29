using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Persistence.Data;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
       
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            
            this.profileService = profileService;
        }

        [HttpGet("getContactInfo")] 
        public async Task<ApiResponse<ContactInfoResponseModel>> GetContactInfoById() => await profileService.GetContactInfoById();
        [HttpPost("updateContactInfo/{id:guid}")]
        public async Task<ApiResponse<ContactUpdateModel>> UpdaContact(Guid id,ContactUpdateModel model) => await profileService.UpdateContact(id,model);

        [HttpGet("getAddressInfo")]
        public async Task<ApiResponse<AddressInfoResponseModel>> GetAddressInfoById() => await profileService.GetAddressInfoById();
        [HttpPost("updateAddressInfo")]
        public async Task<ApiResponse<AddressInfoResponseModel>> UpdateAddress(Guid id, AddressInfoUpdateModel model) => await profileService.UpdateAddress(model);

        [HttpPost("uploadPhoto")]
        public async Task<ApiResponse<FileResponseModel>> UploadPhoto([FromForm]FileRequestModel model) => await profileService.UploadPhoto(model);

        [HttpPost("changeProfilePicture")]
        public async Task<ApiResponse<FileResponseModel>> changeProfile([FromForm] FileRequestUpdateModel model) => await profileService.changeProfilePicture(model);
        [HttpGet("filePath")]
        public async Task<ApiResponse<FileResponseModel>> GetFilePath() => await profileService.GetFilePath();
        [HttpGet("countries")]
        public async Task<ApiResponse<List<CountryResponse>>> GetAllCountries() => await profileService.GetAllCountries();
        [HttpGet("states")]
        public async Task<ApiResponse<List<StateResponse>>> GetAllStates() => await profileService.GetAllStates();
        [HttpGet("cities")]
        public async Task<ApiResponse<List<CityResponse>>> GetAllCities() => await profileService.GetAllCities();
        [HttpPost("addNewCity")]
        public async Task<ApiResponse<CityResposseModel>> AddNewCity(CityRequestModel model) => await profileService.AddCity(model);
       
    }
}
