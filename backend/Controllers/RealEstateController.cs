using backend.Data;
using backend.Entities;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class RealEstateController:BaseController<RealEstateController>
    {
        private readonly IRealEstateService realEstateService;

        public RealEstateController(IRealEstateService realEstateService)
        {
            this.realEstateService = realEstateService;
        }

        [HttpGet("real-estate")]
        public async Task<ActionResult<RealEstateListWithCount>> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            var result = await realEstateService.GetAll(pageNumber, pageSize,search);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("real-estate/{id}")]
        public async Task<ActionResult<List<RealEstate>>> GetByUserId([FromRoute] string id)
        {
            return await realEstateService.GetByUserId(id);
        }
    }
}
