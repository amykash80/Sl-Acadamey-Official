using StreamlineAcademy.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Domain.Entities
{
    public class Location:BaseModel
    {
        public string? Address { get; set; }
        public string? PostalCode { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public Guid? AcademyId { get; set; }
        [ForeignKey(nameof(AcademyId))]
        public Academy? Academy { get; set; }
        public Guid CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }
        public Guid StateId { get; set; }
        [ForeignKey(nameof(StateId))]
        public State? State { get; set; }
        public Guid CityId { get; set; }
        [ForeignKey(nameof(CityId))]
        public City? City { get; set; }

        #region navigation
        public ICollection<Batch>? batches { get; set; }
        #endregion

    }
}
