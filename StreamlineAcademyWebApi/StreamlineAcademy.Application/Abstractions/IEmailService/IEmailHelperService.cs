using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IEmailService
{
	public interface IEmailHelperService
	{
     	Task<bool> SendRegistrationEmail(string emailAddress, string name, string password);
		Task<bool> SendResetPasswordEmail(string emailAddress,string resetCode);
		Task<bool> SendExceptionLogger(string body,string subject);
		Task<bool> SendNotification(List<string> emailAdresses, List<string> name, string body, string subject, string batch, DateTimeOffset scheduleDate);

	}
}
