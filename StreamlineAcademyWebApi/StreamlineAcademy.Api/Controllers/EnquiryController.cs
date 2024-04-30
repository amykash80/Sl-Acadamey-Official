using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System.Threading.Tasks;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService enquiryService;

        public EnquiryController(IEnquiryService enquiryService)
             
        {
            this.enquiryService = enquiryService;
        }

        [HttpPost("add")]
        public async Task<ApiResponse<EnquiryResponseModel>> PostEnquiry(EnquiryRequestModel model) => await enquiryService.AddEnquiry(model);

        [HttpPut("update")]

        public async Task<ApiResponse<EnquiryResponseModel>> UpdateEnquiry(EnquiryUpdateRequest model) => await enquiryService.UpdateEnquiry(model);

        [HttpDelete("delete/{id:guid}")]

        public async Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry (Guid id) => await enquiryService.DeleteEnquiry(id);

        [HttpGet("getAll")]

        public async Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries() => await enquiryService.GetAllEnquiries();


        [HttpGet("getById/{id:guid}")]

        public async Task<ApiResponse<EnquiryResponseModel>> GetEnquiryById(Guid id) => await enquiryService.GetEnquiryById(id);

        [HttpGet("check-email/{enquiryEmail}")]

        public async Task<IResult> IsAcademyEmailUnique(string enquiryEmail)
        {
            var isUnique = await enquiryService.IsEnquiryEmailUnique(enquiryEmail);
            return Results.Ok(isUnique);
        }


    }
}
