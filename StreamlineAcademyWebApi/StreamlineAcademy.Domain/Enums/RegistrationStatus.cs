using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Enums
{
    public enum RegistrationStatus : byte
    {  
        Pending = 1,
        Approved = 2,
        Rejected = 3, 
    }
}
