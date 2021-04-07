using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShipvistaWaterPlants.Models;

namespace ShipvistaWaterPlants.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly PlantDbContext _context;
        public PlantController(PlantDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants() {
            return await _context.Plants.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }
            return plant;
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdatePlant(int id, Plant plant)
        {

            plant.id = id;
            plant.lastWatered = DateTime.Now;
            _context.Entry(plant).State = EntityState.Modified;

            try {

                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!PlantExists(id))
                {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<Plant>> AddPlant(Plant plant)
        {
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();

            return NoContent();
               
        }

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(x => x.id == id);
        }

    }
}
