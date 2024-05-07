using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class LoginRequestModel
    { 
          [Required(ErrorMessage = "Email is required")]
          [RegularExpression("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", ErrorMessage = "Please enter valid Email")]
           public string? Email { get; set; } 
            [Required(ErrorMessage = "Password is required")]
            public string? Password { get; set; }  
    }
}
