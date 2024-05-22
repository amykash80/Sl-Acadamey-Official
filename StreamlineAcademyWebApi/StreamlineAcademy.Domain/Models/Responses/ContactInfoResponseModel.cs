﻿using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Responses
{
    public class ContactInfoResponseModel
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public UserRole UserRole { get; set; }
    }
}
