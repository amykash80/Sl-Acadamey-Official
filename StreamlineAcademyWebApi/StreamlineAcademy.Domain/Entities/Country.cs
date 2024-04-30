using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Country:BaseModel
    {   
        public string? CountryName { get; set; }

		#region navigation
		public ICollection<Academy>? Academies { get; set; }
		#endregion
	}




}
