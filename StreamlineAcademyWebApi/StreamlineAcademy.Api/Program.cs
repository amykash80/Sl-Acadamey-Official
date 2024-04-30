using StreamlineAcademy.Application.DI;
using StreamlineAcademy.Infrastructure.DI;
using StreamlineAcademy.Persistence.DI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using StreamlineAcademy.Api.Middlewares;
using StreamlineAcademy.Api.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding Services added inside AddPersistenceService Etension Method
builder.Services.AddPersistenceService(builder.Configuration)
               .AddAplicationService(builder.Environment.WebRootPath,builder.Configuration)
               .AddInfrastructureService()
               .AddPresentationService();



var app = builder.Build();
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
