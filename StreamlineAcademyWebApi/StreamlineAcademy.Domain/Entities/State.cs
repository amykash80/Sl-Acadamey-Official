using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class State : BaseModel
    {
        public string? StateName { get; set; }
        public Guid? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; } 

		#region navigation
		public ICollection<Academy>? Academies { get; set; }
		#endregion

	}
}
