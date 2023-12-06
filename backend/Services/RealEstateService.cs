using backend.Data;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Services
{

    public class RealEstateListWithCount
    {
        public List<RealEstate> AllRealEstates { get; set; }
        public int TotalCount { get; set; }
    }
    public class RealEstateService : IRealEstateService
    {
        private readonly ApplicationDbContext context;

        public RealEstateService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<RealEstateListWithCount> GetAll(int pageNumber, int pageSize,string search)
        {
            int skipCount = (int)((pageNumber - 1) * Math.Floor((double)pageSize));
            int takeCount = (int)(Math.Floor((double)pageSize / 2));

            var houses = await context.Houses.Include(h => h.Images).ToListAsync();
            var flats = await context.Flats.Include(f => f.Images).ToListAsync();

            var allRealEstates = new List<RealEstate>();
            allRealEstates.AddRange(houses);
            allRealEstates.AddRange(flats);
            var totalCount = allRealEstates.Count;
            if (search != "")
            {
                allRealEstates = allRealEstates.Where(a => a.Title.ToLower().Contains(search.ToLower())).Skip(skipCount).Take(pageSize).ToList();
                totalCount = allRealEstates.Count;
            }
            else allRealEstates = allRealEstates.Skip(skipCount).Take(pageSize).ToList();
            return new RealEstateListWithCount
            {
                AllRealEstates = allRealEstates,
                TotalCount = totalCount
            };
        }


        public async Task<List<RealEstate>> GetByUserId(string id)
        {
            var houses = await context.Houses.Where(h => h.UserId == id).Include(h => h.Images).ToListAsync();
            var flats = await context.Flats.Where(f => f.UserId == id).Include(f => f.Images).ToListAsync();

            var allRealEstates = new List<RealEstate>();
            allRealEstates.AddRange(houses);
            allRealEstates.AddRange(flats);

            return allRealEstates;
        }
    }
}
