using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IPaymentService
    {
        Task<string> CreateCheckoutSessionAsync();
        Task<ApiResponse<string>> ConfirmPaymentAsync(string paymentIntentId);
    }
}
