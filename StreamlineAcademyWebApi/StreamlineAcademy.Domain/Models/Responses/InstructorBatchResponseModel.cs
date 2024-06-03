﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class InstructorBatchResponseModel
    {
        public Guid? Id { get; set; }
        public string? BatchName { get; set; }
        public int? BatchSize { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string? CourseName { get; set; }
        public string? LocationName { get; set; }
        public bool? IsActive { get; set; }

    }
}
