﻿using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class StudentByBatchResponseModel
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? AcademyName { get; set; }
        public bool IsActive { get; set; }
        public string? BatchName { get ; set; }
        public string? CourseName { get; set; }
        

    }
}
