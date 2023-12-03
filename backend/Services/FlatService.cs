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
    public class FlatService : AbstractRealEstateService<Flat,CreateFlat>
    {
        private readonly ApplicationDbContext _context;

        public FlatService(ApplicationDbContext context)
        {
            _context = context;
        }

        public override async Task<decimal> CalculatePrice(int id)
        {
            var flat = await _context.Flats.FindAsync(id);
            decimal price = flat.Area * 88737/91;
            return price;
        }

        public override async Task Create(CreateFlat dto)
        {
            await _context.Flats.AddAsync(dto.ToDomain());
            await _context.SaveChangesAsync();
        }

        public override async Task Delete(int id)
        {
            var flat = await _context.Flats
                .Include(f => f.Images)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (flat != null)
            {
                flat.Images?.Clear();

                _context.Flats.Remove(flat);
                await _context.SaveChangesAsync();
            }
        }



        public override async Task<IReadOnlyList<Flat>> GetAll()
        {
            var flats = await _context.Flats.Include(f => f.Images).ToListAsync();
            return flats;
        }

        public override async Task<Flat> GetById(int id)
        {
            return await _context.Flats.Include(f => f.Images).FirstOrDefaultAsync(h => h.Id == id);
        }
    }
}
