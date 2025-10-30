using StreamlineAcademy.Api.Middlewares;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Services;

namespace StreamlineAcademy.Api.DI
{
    public static class AssemblyRefrence
    {
        public static IServiceCollection AddPresentationService(this IServiceCollection services)
        {
            services.AddTransient<GlobalExceptionHandlingMiddleware>();
            services.AddScoped<IPaymentService, PaymentService>();
       
          return services;
        }
    }
}
