using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using StreamlineAcademy.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Infrastructure.JWT
{
    public class JwtProvider : IJwtProvider
    {
        private readonly IConfiguration configuration;
        private readonly string UserRole = nameof(UserRole);

        public JwtProvider(IConfiguration configuration)
        {
            this.configuration = configuration;
        }



        public string GenerateToken(User user)
        { 

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new List<Claim>
            {
             new Claim(AppClaimTypes.UserId, user.Id.ToString()!),
             new Claim(JwtRegisteredClaimNames.Name, user.Name!),
             new Claim(JwtRegisteredClaimNames.Email, user.Email!),
             new Claim(ClaimTypes.Role , user.UserRole.ToString()),
             }),
                Expires = DateTime.Now.AddHours(1),
                Issuer = configuration["Jwt:Issuer"],
                Audience = configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)), SecurityAlgorithms.HmacSha256),
            };
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.CreateToken(descriptor);

            return handler.WriteToken(securityToken);
        }
    }

    
}
