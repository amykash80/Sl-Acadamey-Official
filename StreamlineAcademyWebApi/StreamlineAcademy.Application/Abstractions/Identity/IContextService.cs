using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.Identity
{
    public interface IContextService
    {
        Guid? GetUserId();
		string? GetRoleName();
		string HttpContextClientURL();
		string HttpContextCurrentURL();

	}
}
