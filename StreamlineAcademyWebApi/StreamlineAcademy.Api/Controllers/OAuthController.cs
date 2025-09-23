using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Domain.Models.Requests;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OAuthController : ControllerBase
    {
        private readonly IOAuthService oAuthService;

        public OAuthController(IOAuthService oAuthService)
        {
            this.oAuthService = oAuthService;
        }
        [HttpPost]
        public async Task<IActionResult> GoogleAuth(GoogleAuthRequest model)
        {
            try
            {
                var res = await oAuthService.GoogleAuth(model);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception( ex.Message); 
            }
        }
    }
}
