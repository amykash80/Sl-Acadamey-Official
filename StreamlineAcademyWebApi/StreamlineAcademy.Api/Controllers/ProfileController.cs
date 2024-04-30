using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
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

        [HttpPut("updateContactInfo")]
        public async Task<ApiResponse<ContactUpdateModel>> UpdaContact(ContactUpdateModel model) => await profileService.UpdateContact(model);

        [HttpGet("getAddressInfo")]
        public async Task<ApiResponse<AddressInfoResponseModel>> GetAddressInfoById() => await profileService.GetAddressInfoById();
        [HttpPut("updateAddressInfo")]
        public async Task<ApiResponse<AddressInfoResponseModel>> UpdateAddress(AddressInfoUpdateModel model) => await profileService.UpdateAddress(model);

        [HttpPost("uploadPhoto")]
        public async Task<ApiResponse<FileResponseModel>> UploadPhoto([FromForm]FileRequestModel model) => await profileService.UploadPhoto(model);
    }
}
