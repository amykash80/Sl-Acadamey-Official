using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IEmailTempelateRenderer
    {
        Task<string> RenderTemplateAsync(string templateName, object model);

    }
}
