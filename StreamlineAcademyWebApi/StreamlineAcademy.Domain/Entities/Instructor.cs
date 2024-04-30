using StreamlineAcademy.Domain.Enums;
using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Instructor
    {
       
        public Guid? Id { get; set; }
        [ForeignKey(nameof(Id))]
        public User? User { get; set; }
        public int WorkExperiance { get; set; }
        public Skill Skill { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
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
        public Batch? Batch { get; set; }
        #endregion
    }
}
