using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.Identity;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
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
        private readonly IFileRepository fileRepository;
        private readonly IStudentRepository studentRepository;
        private readonly IInstructorReository instructorReository;
        private readonly IAcademyRepository academyRepository;

        public ProfileRepository(StreamlineDbContet context,
                                 IContextService contextService,
                                 IUserRepository userRepository,
                                 IFileRepository fileRepository,
                                 IStudentRepository studentRepository,
                                 IInstructorReository instructorReository,
                                 
                                 IAcademyRepository academyRepository) : base(context)
        {
            this.context = context;
            this.contextService = contextService;
            this.userRepository = userRepository;
            this.fileRepository = fileRepository;
            this.studentRepository = studentRepository;
            this.instructorReository = instructorReository;
            this.academyRepository = academyRepository;
        }

        public async Task<AddressInfoResponseModel> GetAddressInfo(Guid? userId)
        {
            var user = await userRepository.FirstOrDefaultAsync(_ => _.Id == userId);
            if (user is not null)
            {
                var academy = await academyRepository.GetAcademyById(userId);
                var student = await studentRepository.GetStudentById(userId);
                var instuctor = await instructorReository.GetInstructorById(userId);
                if (user.UserRole == UserRole.AcademyAdmin)
                {
                    var res = new AddressInfoResponseModel()
                    {
                        Id = user.Id,
                        Address = user.Address,
                        PostalCode = user.PostalCode,
                        CountryName = academy.CountryName,
                        StateName = academy.StateName,
                        CityName = academy.CityName,
                        CountryId = academy.CountryId,
                        StateId = academy.SateId,
                        CityId = academy.CityId,


                    };
                    return res;
                }
                else if (user.UserRole == UserRole.Student)
                {
                    var res = new AddressInfoResponseModel()
                    {
                        Id = user.Id,
                        Address = user.Address,
                        PostalCode = user.PostalCode,
                        CountryName = student.CountryName,
                        StateName = student.StateName,
                        CityName = student.CityName,
                        CountryId = student.CountryId,
                        StateId = student.StateId,
                        CityId = student.CityId,


                    };
                    return res;
                }
                else if (user.UserRole == UserRole.Instructor)
                {
                    var res = new AddressInfoResponseModel()
                    {
                        Id = user.Id,
                        Address = user.Address,
                        PostalCode = user.PostalCode,
                        CountryName = instuctor.CountryName,
                        StateName = instuctor.StateName,
                        CityName = instuctor.CityName,
                        CountryId = instuctor.CountryId,
                        StateId = instuctor.StateId,
                        CityId = instuctor.CityId,


                    };
                    return res;

                }
                return new AddressInfoResponseModel() { };

            }
            return new AddressInfoResponseModel() { };
        }

            public async Task<List<City>> GetAllCities()
        {
            return await Task.Run(()=>context.Cities.ToListAsync());
        }

        public async Task<List<Country>> GetAllCountries()
        {
            return await Task.Run(() => context.Countries.ToListAsync());

        }

        public async Task<List<State>> GetAllStates()
        {
            return await Task.Run(() => context.States.ToListAsync());
        }

      
    }

}


