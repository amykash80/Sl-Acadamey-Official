using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Abstractions.JWT;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

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
                //Create an HttpClient to send HTTP requests to Google.

                //ServerCertificateCustomValidationCallback = always return true → ignores SSL certificate errors. Usually used in dev / testing.

                var httpClient = new HttpClient(new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
                });

                //Converts the Dictionary<string, string> into form URL-encoded content for the POST request.
                
                var content = new FormUrlEncodedContent(payLoad);
               
                //Sends a POST request to Google’s token endpoint with your payload.     
                //Returns a response containing the access token and ID token.
                
                var response = await httpClient.PostAsync("https://oauth2.googleapis.com/token", content);

                //Throws an exception if the HTTP response is not 200 OK.
                //Ensures you only proceed if the request succeeded.
                response.EnsureSuccessStatusCode();

                //Reads the response body as a string.

                //Deserializes the JSON into a GoogleOAuthResponse object(should contain id_token, access_token, etc.).
                var data = await response.Content.ReadAsStringAsync();
                var tokenModel = JsonSerializer.Deserialize<GoogleOAuthResponse>(data);


                //id_token is a JWT (JSON Web Token) containing user info from Google.
                //ReadJwtToken() parses the token.
                //TryGetValue extracts email, profile picture, and name from the token payload.
                var tokenData = new JwtSecurityTokenHandler().ReadJwtToken(tokenModel.id_token);
                tokenData.Payload.TryGetValue("email", out var email);
                tokenData.Payload.TryGetValue("picture", out var picture);
                tokenData.Payload.TryGetValue("name", out var name);


                var googleUser = await userRepository.FirstOrDefaultAsync(u => u.Email == email!.ToString());

                if (googleUser is null || googleUser?.UserRole == null)
                {
                    return ApiResponse<LoginResponseModel>.ErrorResponse("User not registered. Contact admin.");
                }

                var token = jwtProvider.GenerateTokenKey(googleUser);
                var responseGoogleUser = new LoginResponseModel()
                {
                    FullName = googleUser.Name,
                    UserRole = googleUser.UserRole,
                    UserId = googleUser.Id,
                    Token = token.Token,
                    FilePath = picture?.ToString(),
                };


                return ApiResponse<LoginResponseModel>.SuccessResponse(responseGoogleUser, "", HttpStatusCodes.OK);
            }
            catch (Exception ex)
            {
                return ApiResponse<LoginResponseModel>.ErrorResponse(ex.Message);
            }
        }
    }
}
