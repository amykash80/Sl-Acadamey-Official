using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Domain.Shared;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class ProfileRepository : BaseRepository<User>, IProfileRepository
    {
        private readonly StreamlineDbContet context;
        private readonly IContextService contextService;
        private readonly IUserRepository userRepository;
        private readonly IAcademyRepository academyRepository;

        public ProfileRepository(StreamlineDbContet context,
                                 IContextService contextService,
                                 IUserRepository userRepository,
                                 IAcademyRepository academyRepository) : base(context)
        {
            this.context = context;
            this.contextService = contextService;
            this.userRepository = userRepository;
            this.academyRepository = academyRepository;
        }

        public async Task<AddressInfoResponseModel> GetAddressInfo(Guid? userId)
        {
            var user = await userRepository.FirstOrDefaultAsync(_ => _.Id == userId);
             if(user is not null)
            {
                var academy=await academyRepository.GetAcademyById(userId);
                var res = new AddressInfoResponseModel() { 
                Id=user.Id,
                Address=user.Address,
                PostalCode=user.PostalCode,
                CountryName=academy.CountryName,
                StateName=academy.StateName,
                CityName=academy.CityName,
                };
                return res;
            }
            return new AddressInfoResponseModel() { };
        }

    }

}


