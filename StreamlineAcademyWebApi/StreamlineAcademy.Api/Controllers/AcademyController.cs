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
using System.Runtime.InteropServices;
//using static StreamlineAcademy.Domain.Models.Requests.AcademyResponseModel;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =nameof(UserRole.SuperAdmin))]
    public class AcademyController : ControllerBase
    {
        private readonly IAcademyService academyService;

        public AcademyController(IAcademyService academyService)
        {
            this.academyService = academyService;
        }

        [HttpPost("register")]
        public async Task<ApiResponse<AcademyResponseModel>> RegisterAcademy(AcademyRequestModel request) => await academyService.RegisterAcademy(request);

        [HttpPost("academy-type")]
        public async Task<ApiResponse<AcademyTypeResponseModel>> CreateAcademyType(AcademyTypeRequestModel request) => await academyService.CreateAcademyType(request);

        [HttpGet("getAll-acadamies")]
        public async Task<ApiResponse<IEnumerable<AcademyResponseModel>>> GetAllAcademies() => await academyService.GetAllAcademies();

        [HttpGet("getAll-acadamyTypes")]
        public async Task<ApiResponse<IEnumerable<AcademyTypeResponseModel>>> GetAllAcademyTypes() => await academyService.GetAllAcademyTypes();

        [HttpGet("getById/{id:guid}")]
        public async Task<ApiResponse<AcademyResponseModel>> GetAcademyById(Guid id) => await academyService.GetAcademyById(id);

        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse<AcademyResponseModel>> DeleteAcademy(Guid id) => await academyService.DeleteAcademy(id);

        [HttpPut("update")]
        public async Task<ApiResponse<AcademyResponseModel>> UpdateAcademy(AcademyUpdateRequest model) => await academyService.UpdateAcademy(model);

        [HttpGet("check-name/{academyName}")]

        public async Task<IResult> IsAcadeyNameUnique(string academyName)
        {
            var isUnique = await academyService.IsAcademyNameUnique(academyName);
            return Results.Ok(isUnique);
        }

    }
}
