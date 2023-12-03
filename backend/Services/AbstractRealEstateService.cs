using backend.DTOs;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public abstract class AbstractRealEstateService<T, W>
    {
        public abstract  Task Create(W dto);

        public abstract Task Delete(int id);

        public abstract Task<IReadOnlyList<T>> GetAll();

        public abstract Task<T> GetById(int id);
        public abstract Task<decimal> CalculatePrice(int id);
    }
}
