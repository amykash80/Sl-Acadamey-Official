using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Abstractions.IRepositories;
using StreamlineAcademy.Application.Shared;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Models.Responses;
using StreamlineAcademy.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Repositories
{
    public class LocationRepository:BaseRepository<Location>,ILocationRepository
    {
        private readonly StreamlineDbContet context;

        public LocationRepository(StreamlineDbContet context):base(context)
        {
            this.context = context;
        }

        public async Task<int> DeleteLocation(Location model)
        {
            await Task.Run(() => context.Set<Location>().Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LocationResponseModel>> GetAllLocations(Guid? id)
        {
            var locations = await context.Locations
                    .Where(a => a.AcademyId == id) 
                    .Include(a => a.Academy)
                    .Include(a => a.Country)
                    .Include(a => a.State)
                    .Include(a => a.City)
                    .Select(a => new LocationResponseModel
                    {
                        Id = a.Id,
                        Address = a.Address,
                        PostalCode = a.PostalCode,
                        Latitude = a.Latitude,
                        Longitude = a.Longitude,
                        AcademyName = a.Academy!.AcademyName,
                        CountryName = a.Country!.CountryName,
                        StateName = a.State!.StateName,
                        CityName = a.City!.CityName,
                        IsActive = a.IsActive,
                    })
                    .ToListAsync();

            return locations;
        }

        public async Task<LocationResponseModel> GetLocationJoinById(Guid? id)
        {
            var location = await context.Locations
           .Include(a => a.Academy)
           .Include(a => a.Country)
           .Include(a => a.State)
           .Include(a => a.City)
           .FirstOrDefaultAsync(a => a.Id == id);

            if (location is not null)
            {
                var response = new LocationResponseModel
                {
                    Id = location.Id,
                    Address = location.Address,
                    PostalCode = location.PostalCode,
                    Latitude = location.Latitude,
                    Longitude = location.Longitude,
                    AcademyName = location.Academy!.AcademyName,
                    CountryName=location.Country!.CountryName,
                    StateName = location.State!.StateName,
                    CityName = location.City!.CityName,
                    IsActive = location.IsActive,
                };

                return response;
            }
            return new LocationResponseModel() { };
        }
    }
}
