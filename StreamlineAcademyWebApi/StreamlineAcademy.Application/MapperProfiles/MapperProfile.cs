using AutoMapper;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Requests;
using StreamlineAcademy.Domain.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.MapperProfiles
{
    public class MapperProfile
    {
        public class EnqiryProfile : AutoMapper.Profile
        {

            public EnqiryProfile()
            {
                CreateMap<EnquiryRequestModel, Enquiry>();
                CreateMap<Enquiry, EnquiryResponseModel>();
                CreateMap<EnquiryUpdateRequest, Enquiry>();
                
            }

        }

        public class AcademyProfile : AutoMapper.Profile
        {

            public AcademyProfile()
            {
                CreateMap<AcademyRequestModel, Academy>();
                CreateMap<Academy, AcademyResponseModel>();
                CreateMap<AcademyRequestModel, User>();
            }

        }

        public class LoginProfile : AutoMapper.Profile
        {

            public LoginProfile()
            {
                CreateMap<LoginRequestModel, User>();
                CreateMap<User, LoginResponseModel>();
            }

        }

       
    }
}
