using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class StudentBatch:BaseModel
    {
      public Guid? StudentId { get; set; }
        [ForeignKey(nameof(StudentId))]
     public Student? Student { get; set; }
      public Guid? BatchId { get; set; }
        [ForeignKey(nameof(BatchId))]
     public Batch? Batch { get; set; }  
    }
}
