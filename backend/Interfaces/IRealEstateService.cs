using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IRealEstateService
    {
        Task<RealEstateListWithCount> GetAll(int pageNumber, int pageSize,string search);
        Task<List<RealEstate>> GetByUserId(string id);
    }
}
