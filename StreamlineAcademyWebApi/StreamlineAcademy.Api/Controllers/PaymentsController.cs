using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamlineAcademy.Application.Abstractions.IServices;

namespace StreamlineAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        [HttpPost("payment")]
        public async Task<IActionResult> CreateCheckoutSessionAsync()
        {
            try
            {
                var res = await paymentService.CreateCheckoutSessionAsync();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }

}
