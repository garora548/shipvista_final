using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShipvistaWaterPlants.Models
{
    public class PlantDbContext : DbContext
    {
        public PlantDbContext(DbContextOptions<PlantDbContext> options) : base(options)
        {
                
        }

        public DbSet<Plant> Plants { get; set; }
    }
}
