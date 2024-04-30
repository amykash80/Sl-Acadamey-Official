using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    
    public class ChangePasswordRequestModel
    { 
        [Required(ErrorMessage = "Enter Old Password")]
        public string? OldPassword { get; set; } 
        [Required(ErrorMessage = "Please Enter Password"), DataType(DataType.Password)]
        public string? NewPassword { get; set; } 
        [Compare(nameof(NewPassword))]
        public string? ConfirmPassword { get; set; } 
    }
}
