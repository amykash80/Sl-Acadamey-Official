using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Student
    {
        public Guid? Id { get; set; }
        [ForeignKey(nameof(Id))]
        public User? User { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string? EmergencyContactNo { get; set; }
        public Guid CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }
        public Guid StateId { get; set; }
        [ForeignKey(nameof(StateId))]
        public State? State { get; set; }
        public Guid CityId { get; set; }
        [ForeignKey(nameof(CityId))]
        public City? City { get; set; }
        public Guid? AcademyId { get; set; }
        [ForeignKey(nameof(AcademyId))]
        public Academy? Academy { get; set; }

        #region navigation
        public ICollection<Batch>? batches { get; set; }
        public ICollection<Attendance>? Attendances { get; set; }
        #endregion
    }
}
