using Microsoft.Extensions.Configuration;
using MimeKit;
using StreamlineAcademy.Application.Abstractions.IEmailService;
using System;
using System.Collections.Generic;
using System.Linq;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Text;
using System.Threading.Tasks;
using StreamlineAcademy.Domain.Models.Common;
using StreamlineAcademy.Application.Abstractions.IServices;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Application.Abstractions.Identity;
using static StreamlineAcademy.Application.Shared.APIMessages;
using System.Net.Mail;
using System.Reflection.Metadata.Ecma335;

namespace StreamlineAcademy.Application.Services
{
	public class EmailHelperService:IEmailHelperService
	{

		private readonly IConfiguration configuration;
        private readonly IEmailTempelateRenderer emailTempelateRenderer;
        private readonly IContextService contextService;

        public EmailHelperService(IConfiguration configuration,
			                      IEmailTempelateRenderer emailTempelateRenderer,
								  IContextService contextService)
		{
			this.configuration = configuration;
            this.emailTempelateRenderer = emailTempelateRenderer;
            this.contextService = contextService;
        }

		public async Task<bool> SendRegistrationEmail(string emailAddress, string name, string password)
		{
        
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Stramline Academies Registration";
            string body = await emailTempelateRenderer.RenderTemplateAsync(APIMessages.TemplateNames.AcademyRegistration, new
            {
                Name = name,
                Email = emailAddress,
				CompanyName=APIMessages.ProjectName,
                Password = password,
                Link = $"{contextService.HttpContextClientURL()}/{AppRoutes.loginRoute}"

            });
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendRegistrationEmail(emailMessage);
        

		}
		public async Task<bool> SendRegistrationEmail(MimeMessage emailMessage)
		{
			var emailParameters = new EmailParameters();
			emailParameters.SmtpHost = configuration.GetValue<string>("EmailSettings:SmtpHost");
			emailParameters.Port = configuration.GetValue<int>("EmailSettings:Port");
			emailParameters.UserName = configuration.GetValue<string>("EmailSettings:RegisterMail");
			emailParameters.Password = configuration.GetValue<string>("EmailSettings:RegisterMailPassword");
			var res= await Send(emailMessage, emailParameters);
			return res;
		}

		private async Task<bool> Send(MimeMessage email, EmailParameters emailParameters)
		{
			try
			{
				using var smtp = new MailKit.Net.Smtp.SmtpClient();
				smtp.Connect(emailParameters.SmtpHost, emailParameters.Port, SecureSocketOptions.StartTls);
				smtp.Authenticate(emailParameters.UserName, emailParameters.Password);
				await smtp.SendAsync(email);
				smtp.Disconnect(true);
				return true;
			}
			catch (Exception ex)
			{
				return false;
			}
		}

		public MimeMessage CreateMailMessage(string emailAddress, string Subject, string body)
		{
			var email = new MimeMessage();
			email.Sender = MailboxAddress.Parse(configuration.GetValue<string>("EmailSettings:From"));
			email.To.Add(MailboxAddress.Parse(emailAddress));
			email.Subject = Subject;
			var builder = new BodyBuilder();
			builder.HtmlBody = body;
			email.Body = builder.ToMessageBody();
			return email;
		}

        public async Task<bool> SendResetPasswordEmail(string emailAddress,string restcode)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Stramline Academies Reset Password";
            string body = await emailTempelateRenderer.RenderTemplateAsync(APIMessages.TemplateNames.PasswordReset, new
            {
                    CompanyName = APIMessages.ProjectName,
                    Link = $"{contextService.HttpContextClientURL()}/{AppRoutes.ClientResetPasswordRoute}?resetcode={restcode}"
			
            });
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendRegistrationEmail(emailMessage);
        }

        public async Task<bool> SendExceptionLogger(string subject,string body)
        {
            var emailMessage = CreateMailMessage("",subject, body);
            return await SendRegistrationEmail(emailMessage);
        }

		public async Task<bool> SendNotification(List<string> emailAddresses, List<string> name, string body, string subject, string batch, DateTimeOffset scheduleDate)
		{
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            bool allEmailsSent = true;
            for (int i = 0; i < emailAddresses.Count; i++)
            {
                string personalizedBody = $"Hi {name[i]},<br>" +
                                          $"Welcome to StreamLine Academy!<br>" +
                                          $"{body} on {scheduleDate!.ToString("MM/dd/yyyy")} for batch {batch}.";

                var emailMessage = CreateMailMessage(emailAddresses[i], subject, personalizedBody);
                bool emailSent = await SendRegistrationEmail(emailMessage);
            }

            return allEmailsSent;
            
        }
		
	}
}
