using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Course:BaseModel
    {  
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? DurationInWeeks{ get; set; }
        public int? Fee { get; set; }
        public Guid? CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public CourseCategory? CourseCategory { get; set; }
        public Guid? AcademyId { get; set; }
        [ForeignKey(nameof(AcademyId))]
        public Academy? Academy { get; set; }

        #region navigation
        public ICollection<Batch>? batches { get; set; }
        public ICollection< CourseContent>? CourseContents { get; set; }
        public ICollection<Student>? students { get; set; }
        public ICollection<CourseResource>? CourseResources { get; set; }

        #endregion

    }
}
