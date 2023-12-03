using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IFlatService
    {
        Task<IReadOnlyList<Flat>> GetAllFlats();
        Task<Flat> GetById(int id);

        Task CreateFlat(CreateFlat dto);
        Task DeleteFlat(int id);
    }
}
