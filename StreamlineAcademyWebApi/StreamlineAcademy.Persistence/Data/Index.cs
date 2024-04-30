using Microsoft.EntityFrameworkCore;
using StreamlineAcademy.Application.Utils;
using StreamlineAcademy.Domain.Entities;
using StreamlineAcademy.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Persistence.Data
{
    public static class Index
    {
        private static void ConfigureIndex(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Enquiry>().HasIndex(x => x.Name);
            modelBuilder.Entity<Enquiry>().HasIndex(x => x.Email);
            modelBuilder.Entity<Academy>().HasIndex(x => x.AcademyName);
        }

    
         

        public static void ConfigureIndexesAndData(this ModelBuilder modelBuilder)
        {
            Index.ConfigureIndex(modelBuilder);
        }
}
}
