using backend.Data;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RealEstateService : IRealEstateService
    {
        private readonly ApplicationDbContext context;

        public RealEstateService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<List<RealEstate>> GetAll()
        {
            var houses = await context.Houses.Include(h => h.Images).ToListAsync();
            var flats = await context.Flats.Include(f => f.Images).ToListAsync();

            var allRealEstates = new List<RealEstate>();
            allRealEstates.AddRange(houses);
            allRealEstates.AddRange(flats);

            return allRealEstates;
        }

        public async Task<List<RealEstate>> GetByUserId(int id)
        {
            var houses = await context.Houses.Where(h => h.UserId == id.ToString()).Include(h => h.Images).ToListAsync();
            var flats = await context.Flats.Where(f => f.UserId == id.ToString()).Include(f => f.Images).ToListAsync();

            var allRealEstates = new List<RealEstate>();
            allRealEstates.AddRange(houses);
            allRealEstates.AddRange(flats);

            return allRealEstates;
        }
    }
}
