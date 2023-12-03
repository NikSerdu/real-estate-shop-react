using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace backend.Services
{
    public class HouseService :AbstractRealEstateService<House,CreateHouse>
    {
        private readonly ApplicationDbContext _context;

        public HouseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public override async Task<decimal> CalculatePrice(int id)
        {
            var house = await _context.Houses.FindAsync(id);
            decimal price = house.Area * 95720/91 + house.GardenArea*3000/91;
            return price;
        }

        public override async Task Create(CreateHouse dto)
        {
            await _context.Houses.AddAsync(dto.ToDomain());
            await _context.SaveChangesAsync();
        }

        public override async Task Delete(int id)
        {
            var house = await _context.Houses
                .Include(h => h.Images)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (house != null)
            {
                // Remove associated images
                house.Images?.Clear(); // Use the null-conditional operator to handle null

                _context.Houses.Remove(house);
                await _context.SaveChangesAsync();
            }
        }

        public override async Task<IReadOnlyList<House>> GetAll()
        {
            var houses = await _context.Houses.ToListAsync();
            return houses;
        }

        public override async Task<House> GetById(int id)
        {
            return await _context.Houses.Include(h => h.Images).FirstOrDefaultAsync(h => h.Id == id);
        }
    }
}
