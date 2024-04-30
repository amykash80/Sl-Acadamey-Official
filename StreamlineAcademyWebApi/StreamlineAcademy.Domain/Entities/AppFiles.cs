using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class AppFiles:BaseModel
    {
        public Module? Module { get; set; }
        public string? FilePath { get; set; }
        public Guid? EntityId { get; set; }

    }
}
