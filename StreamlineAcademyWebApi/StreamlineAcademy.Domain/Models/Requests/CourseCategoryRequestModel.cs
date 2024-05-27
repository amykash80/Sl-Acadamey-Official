using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class CourseCategoryRequestModel
    {
        public string? CategoryName { get; set; }

    }

    public class CourseCategoryUpdateModel
    {
        public Guid? Id { get; set; }
        public string? CategoryName { get; set; }

    }
}
