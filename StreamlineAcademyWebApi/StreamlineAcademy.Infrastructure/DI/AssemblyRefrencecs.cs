using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using StreamlineAcademy.Application.Abstractions.IExceptionNotifier;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Infrastructure.ExceptionNotifier;
using StreamlineAcademy.Infrastructure.Identity;
using StreamlineAcademy.Infrastructure.JWT;
using StreamlineAcademy.Infrastructure.TempelateRenderer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Infrastructure.DI
{
    public static class AssemblyRefrencecs
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services)
        {
            services.AddSingleton<IContextService, ContextService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IJwtProvider, JwtProvider>();
            services.AddScoped<IEmailTempelateRenderer, EmailTempelateRenderer>();
            services.AddTransient<IExceptionNotifier, EmailExceptionLogger>();
            return services;

        }
    }
}
