using StreamlineAcademy.Api.Middlewares;

namespace StreamlineAcademy.Api.DI
{
    public static class AssemblyRefrence
    {
        public static IServiceCollection AddPresentationService(this IServiceCollection services)
        {
            services.AddTransient<GlobalExceptionHandlingMiddleware>();
            return services;
        }
    }
}
