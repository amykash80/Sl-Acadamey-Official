using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class AcademyType:BaseModel
    {
        public string? Name { get; set; }
		public ICollection<Academy>? Academies { get; set; }
	}
}
