using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IOAuthService
    {
        Task<ApiResponse<LoginResponseModel>> GoogleAuth(GoogleAuthRequest model);   
    }
}
