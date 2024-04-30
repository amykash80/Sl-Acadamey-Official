using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class StudentInterestsResponseModel
    {
        public List<Course>? IntrestedIn {  get; set; }
    }
}
