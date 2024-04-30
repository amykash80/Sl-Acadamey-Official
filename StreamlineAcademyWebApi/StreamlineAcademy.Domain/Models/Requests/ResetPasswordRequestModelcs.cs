using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Models.Requests
{
    public class ResetPasswordRequestModel
    {
        public string? ResetCode { get; set; }
        [Required]
        public string? NewPassword { get; set; }
        [Required]
        [Compare(nameof(NewPassword), ErrorMessage = "Password / Confirm password do not match.")]
        public string? ConfrimPassword { get; set; }

    }
}
