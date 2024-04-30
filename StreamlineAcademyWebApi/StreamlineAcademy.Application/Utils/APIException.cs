using StreamlineAcademy.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Utils
{
    public class APIException:Exception
    {
        public int ErrorCode { get; }
        public APIException(int errorCode = HttpStatusCodes.InternalServerError, string? message = default) : base(message)
        {
            ErrorCode = errorCode;
        }
    }
    public sealed class APIValidationException : APIException
    {
        public APIValidationException(string message = "Validation error, please check the data you have sent.", string field = null!)
        {
            Errors = new List<APIError> { new APIError(string.Format(message, field), field) };
        }
        public APIValidationException(List<APIError> errors)
        {
            Errors = errors;
        }
        public List<APIError> Errors { get; }
    }

    public sealed class ForbiddenException : APIException
    {
        public ForbiddenException(string message = null!)
            : base(HttpStatusCodes.Forbidden, message ?? "You do not have permission.")
        {
        }
    }
    public sealed class APIInfoException : APIException
    {
        public APIInfoException(string message) : base(HttpStatusCodes.Conflict, message)
        {

        }
    }
    public sealed class APINotFoundException : APIException
    {
        public APINotFoundException(string message) : base(HttpStatusCodes.NotFound, message)
        {

        }
    }
}
