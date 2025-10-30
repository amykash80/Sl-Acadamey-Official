using StreamlineAcademy.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamlineAcademy.Domain.Entities
{
    public class Payment:BaseModel
    {
        public Guid StudentId { get; set; }
        public Guid CourseId { get; set; }

        public float Amount { get; set; }
        public Guid TransactionId { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public DateTimeOffset PaymentDate { get; set; }

        [ForeignKey(nameof(StudentId))]
        public Student? Student { get; set; }

        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }
    }
}
