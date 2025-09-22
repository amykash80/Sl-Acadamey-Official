using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Text.Json;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.JWT;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace StreamlineAcademy.Application.Services
{
    public class OAuthService : IOAuthService
    {
        private readonly HttpClient httpClient;
        private readonly IUserRepository userRepository;
        private readonly IJwtProvider jwtProvider;
        private readonly IFileRepository fileRepository;

        public OAuthService(IUserRepository userRepository, IJwtProvider jwtProvider, IFileRepository fileRepository)
        {
            this.userRepository = userRepository;
            this.jwtProvider = jwtProvider;
            this.fileRepository = fileRepository;
            //this.httpClient = httpClient;
        }
        public async Task<ApiResponse<LoginResponseModel>> GoogleAuth(GoogleAuthRequest model)
        {
            try
            {
                var payLoad = new Dictionary<string, string>
            {
                { "client_id" , model.ClientId },
                {  "client_secret" , "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" },
                { "code" , model.Code },
                { "grant_type" , "authorization_code" },
                { "redirect_uri" , model.Redirect_Uri },
            };

                var httpClient = new HttpClient(new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
                });

                var content = new FormUrlEncodedContent(payLoad);
                var response = await httpClient.PostAsync("https://oauth2.googleapis.com/token", content);

                response.EnsureSuccessStatusCode();

                var data = await response.Content.ReadAsStringAsync();
                var tokenModel = JsonSerializer.Deserialize<GoogleOAuthResponse>(data);

                var tokenData = new JwtSecurityTokenHandler().ReadJwtToken(tokenModel.id_token);
                tokenData.Payload.TryGetValue("email", out var email);
                tokenData.Payload.TryGetValue("picture", out var picture);
                tokenData.Payload.TryGetValue("name", out var name);


                var googleUser = await userRepository.FirstOrDefaultAsync(u => u.Email == email);
                if (googleUser is null)
                {
                    googleUser = new User()
                    {
                        Id = Guid.NewGuid(),
                        Name = name.ToString(),
                        Email = email.ToString(),
                        IsActive = true,
                        UserRole = Domain.Enums.UserRole.Student
                    };
                    var userCreated = await userRepository.InsertAsync(googleUser);
                    var fileInserted = await fileRepository.InsertAsync(new AppFiles
                    {
                        EntityId = googleUser.Id,
                        FilePath = picture.ToString()
                    });
                }


                var token = jwtProvider.GenerateTokenKey(googleUser);
                var responseGoogleUser = new LoginResponseModel()
                {
                    FullName = googleUser.Name,
                    UserRole = googleUser.UserRole,
                    UserId = googleUser.Id,
                    Token = token.Token,
                    FilePath = picture.ToString(),
                };


                return ApiResponse<LoginResponseModel>.SuccessResponse(responseGoogleUser,"", HttpStatusCodes.OK);
            }
            catch (Exception ex)
            {
                return ApiResponse<LoginResponseModel>.ErrorResponse(ex.Message);
            }

        }
    }
}
