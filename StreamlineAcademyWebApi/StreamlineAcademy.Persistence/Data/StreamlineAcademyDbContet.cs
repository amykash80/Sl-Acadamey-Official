using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Utils;
using StreamlineAcademy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using StreamlineAcademy.Domain.Enums;
using System.Threading.Tasks;
using Org.BouncyCastle.Math.EC.Rfc7748;

namespace StreamlineAcademy.Persistence.Data
{
    public class StreamlineDbContet : DbContext
    {
        public StreamlineDbContet(DbContextOptions<StreamlineDbContet> options):base(options) 
        {
           
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<SuperAdmin> SuperAdmins { get; set; }
        public DbSet<Academy> Academies { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<AcademyType> AcademyTypes { get; set; }
        public DbSet<AppFiles> AppFiles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Batch> Batches { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<StudentInterests> StudentInterests { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<CourseContent> CourseContents { get; set; }
        public DbSet<StudentBatch> StudentBatches { get; set; }    
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<CourseResource> CourseResources { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ConfigureIndexesAndData();
        }

    }
}
