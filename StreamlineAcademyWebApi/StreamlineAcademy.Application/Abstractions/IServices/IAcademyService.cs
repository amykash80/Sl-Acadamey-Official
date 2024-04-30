using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using static StreamlineAcademy.Domain.Models.Requests.AcademyResponseModel;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IAcademyService
    {
        Task<ApiResponse<AcademyResponseModel>> RegisterAcademy(AcademyRequestModel request);
        Task<ApiResponse<AcademyTypeResponseModel>> CreateAcademyType(AcademyTypeRequestModel model);
        Task<ApiResponse<IEnumerable<AcademyResponseModel>>> GetAllAcademies();
        Task<ApiResponse<IEnumerable<AcademyTypeResponseModel>>> GetAllAcademyTypes();
      Task<ApiResponse<AcademyResponseModel>> GetAcademyById(Guid id);
        Task<ApiResponse<AcademyResponseModel>> DeleteAcademy(Guid id);
        Task<ApiResponse<AcademyResponseModel>> UpdateAcademy(AcademyUpdateRequest request);
        Task<bool> IsAcademyNameUnique(string name);
    }
}
