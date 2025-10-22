using StreamlineAcademy.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Abstractions.IServices
{
    public interface IPaymentService
    {
        Task<string> CreatePaymentIntentAsync(long amount,string currency);
    }
}
