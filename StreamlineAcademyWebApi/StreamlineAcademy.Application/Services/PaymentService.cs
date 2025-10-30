using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using Stripe;
using Stripe.Checkout;

namespace StreamlineAcademy.Application.Services
{
    public class PaymentService : IPaymentService
    {
        public PaymentService()
        {

        }
        public Task<ApiResponse<string>> ConfirmPaymentAsync(string paymentIntentId)
        {
            throw new NotImplementedException();
        }

        public async Task<string> CreateCheckoutSessionAsync()
        {
            StripeConfiguration.ApiKey = "sk_test_51SMmLdF8q8cRXJeKHBwbv4b1wNCivYP5rx1kD14IgYixVBursOP4l1p0AtvhJ1U2dwtwb0jkPP0kdjjXITuIFFsx00iuhCATGd";
            var domain = "https://localhost:4200";

            var price = new PriceCreateOptions()
            {
                Currency = "usd",
                UnitAmount = 4000,
                ProductData = new() { Name = "Course" }
            };
            var pService = new PriceService();
            var priceObj = await pService.CreateAsync(price);

            var options = new SessionCreateOptions
            {
                SuccessUrl = $"{domain}/success?session_id={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{domain}/cancelled",
                Mode = "payment",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Quantity = 1,
                        Price = priceObj.Id
                    }
                }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Url;
        }

    }
}
