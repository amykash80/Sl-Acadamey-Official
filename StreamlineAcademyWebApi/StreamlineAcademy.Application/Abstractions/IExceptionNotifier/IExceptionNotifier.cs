using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IExceptionNotifier
{
    public interface IExceptionNotifier
    {
        void LogToEmail(Exception ex);
    }
}
