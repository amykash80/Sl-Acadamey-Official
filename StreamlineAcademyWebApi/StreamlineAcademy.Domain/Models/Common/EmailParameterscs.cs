using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Common
{
	public class EmailParameters
	{
		public string? SmtpHost { get; set; }
		public int Port { get; set; }
		public string? UserName { get; set; }
		public string? Password { get; set; }
	}
}

