using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IHouseService
    {
        Task<IReadOnlyList<House>> GetAllHouses();
        Task<House> GetById(int id);

        Task CreateHouse(CreateHouse dto);
        Task DeleteHouse(int id);
    }
}
