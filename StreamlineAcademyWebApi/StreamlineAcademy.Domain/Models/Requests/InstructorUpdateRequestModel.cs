﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class InstructorUpdateRequestModel:InstructorRequestModel
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        
    }
}
