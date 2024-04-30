using RazorLight;
using StreamlineAcademy.Application.Abstractions.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Infrastructure.TempelateRenderer
{
    public class EmailTempelateRenderer : IEmailTempelateRenderer
    {
        public async Task<string> RenderTemplateAsync(string templateName, object model)
        {
            string templateResult = string.Empty;

            try
            {
                var assemblyLocation = Assembly.GetExecutingAssembly().Location;
                string assemblyDirectory = Path.GetDirectoryName(assemblyLocation);
                var templateFolder = Path.Combine(assemblyDirectory, "EmailTemplates");
                var engine = new RazorLightEngineBuilder()
                .UseFileSystemProject(templateFolder)
                .UseMemoryCachingProvider()
                .EnableDebugMode()
                .Build();  
                templateResult = await engine.CompileRenderAsync(templateName, model);
            }
            catch (Exception)
            {
                throw;
            }

            return templateResult;
        }
    }
}
