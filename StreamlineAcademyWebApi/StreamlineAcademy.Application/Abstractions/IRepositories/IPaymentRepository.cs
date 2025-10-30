using StreamlineAcademy.Domain.Entities;

namespace StreamlineAcademy.Application.Abstractions.IRepositories
{
    public interface IPaymentRepository
    {
        Task AddAsync(Payment payment);
        Task<Payment?> GetByStripeIdAsync(string stripePaymentIntentId);
        Task UpdateAsync(Payment payment);
    }

}
