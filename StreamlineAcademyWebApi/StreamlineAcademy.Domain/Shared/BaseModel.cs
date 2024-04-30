using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Shared
{
    public  class BaseModel
    {
        public Guid? Id { get; set; }
		public bool IsActive { get; set; }
		public Guid? CreatedBy { get; set; }
		public DateTimeOffset? CreatedDate { get; set; }
		public Guid? ModifiedBy { get; set; }
		public DateTimeOffset? ModifiedDate { get; set; }
		public Guid? DeletedBy { get; set; }
		public DateTimeOffset? DeletedDate { get; set; }

	}
}
