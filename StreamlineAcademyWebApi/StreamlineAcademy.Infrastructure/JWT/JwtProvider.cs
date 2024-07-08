using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Models.JWT;
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


        public UserTokens GenerateTokenKey(User user)
        {
            try
            {
                if (user == null) throw new ArgumentException(nameof(user));

                var userToken = new UserTokens();
                var jwtSettings = new JwtSettings
                {
                    IssuerSigningKey = configuration["Jwt:Key"],
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"]
                };

                var key = Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey);
                Guid id = Guid.Empty;
                DateTime expireTime = DateTime.UtcNow.AddHours(1);

                userToken.Validaty = expireTime.TimeOfDay;

                var claims = new List<Claim>
            {
                new Claim(AppClaimTypes.UserId, user.Id.ToString()!),
                new Claim(JwtRegisteredClaimNames.Name, user.Name!),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            };

                var jwtToken = new JwtSecurityToken(
                    issuer: jwtSettings.ValidIssuer,
                    audience: jwtSettings.ValidAudience,
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: expireTime,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );

                userToken.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                userToken.UserName = user.Name;
                userToken.Id = user.Id;
                userToken.Role = user.UserRole;

                return userToken;
            }
            catch (Exception)
            {
                throw;
            }
        }


    }


}
