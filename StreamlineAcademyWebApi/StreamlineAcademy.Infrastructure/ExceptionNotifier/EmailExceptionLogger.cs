using Newtonsoft.Json;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using StreamlineAcademy.Application.Abstractions.IExceptionNotifier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace StreamlineAcademy.Infrastructure.ExceptionNotifier
{
    public class EmailExceptionLogger : IExceptionNotifier
    {

        private readonly IEmailHelperService emailService;
        public EmailExceptionLogger(
            IEmailHelperService emailService)
        {
            this.emailService = emailService;
        }

        public void LogToEmail(Exception ex)
        {

            // if ()
            var body = JsonConvert.SerializeObject(ex, Formatting.Indented);
            var subject = ex.Message;
            emailService.SendExceptionLogger(body, subject);

        }
    }
    public sealed class EmailExceptionLoggerOptions
    {
        public List<string> To { get; set; } = new List<string>();


        public List<string> CC { get; set; } = new List<string>();
    }
}

