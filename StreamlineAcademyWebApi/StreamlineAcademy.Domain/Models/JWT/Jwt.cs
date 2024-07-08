using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.JWT
{
    public class UserTokens
    {
        public string? Token
        {
            get;
            set;
        }
        public string? UserName
        {
            get;
            set;
        }
        public UserRole? UserRole
        {
            get;
            set;
        }
        public string? FullName
        {
            get;
            set;
        }
        public TimeSpan Validaty
        {
            get;
            set;
        }
        public string? RefreshToken
        {
            get;
            set;
        }
        public Guid? Id
        {
            get;
            set;
        }
        public string? EmailId
        {
            get;
            set;
        }
        public Guid GuidId
        {
            get;
            set;
        }
        public DateTime ExpiredTime
        {
            get;
            set;
        }
        public UserRole? Role { get; set; }
    }
}
