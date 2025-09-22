using StreamlineAcademy.Api.Controllers;
using StreamlineAcademy.Api.DI;
using StreamlineAcademy.Api.Middlewares;
using StreamlineAcademy.Application.DI;
using StreamlineAcademy.Infrastructure.DI;
using StreamlineAcademy.Persistence.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Adding Services added inside below chained Etension Methods
builder.Services.AddPersistenceService(builder.Configuration)
               .AddAplicationService(builder.Environment.WebRootPath,builder.Configuration)
               .AddInfrastructureService()
               .AddPresentationService();

Employee emp = new Employee();
emp.Name = "Abid";
emp.CountedSalary();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
var app = builder.Build();
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
