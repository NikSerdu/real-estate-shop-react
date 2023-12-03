using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IRealEstateService
    {
        Task<List<RealEstate>> GetAll();
        Task<List<RealEstate>> GetByUserId(int id);
    }
}
