using backend.Data;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class RealEstateController:BaseController<RealEstateController>
    {
        private readonly IRealEstateService realEstateService;

        public RealEstateController(ApplicationDbContext context, IRealEstateService realEstateService)
        {
            this.realEstateService = realEstateService;
        }

        [HttpGet("real-estate")]
        public async Task<ActionResult<List<RealEstate>>> GetAll()
        { 
            return await realEstateService.GetAll();
        }

        [HttpGet("real-estate/{id}")]
        public async Task<ActionResult<List<RealEstate>>> GetByUserId([FromRoute] int id)
        {
            return await realEstateService.GetByUserId(id);
        }
    }
}
