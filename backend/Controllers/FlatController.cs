using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class FlatController : BaseController<FlatController>
    {
        private readonly AbstractRealEstateService<Flat, CreateFlat> flatService;

        public FlatController(AbstractRealEstateService<Flat, CreateFlat> flatService)
        {
            this.flatService = flatService;
        }

        [HttpGet("flats")]
        public async Task<ActionResult<IReadOnlyList<Flat>>> GetAllHouses()
        {
            var flats = await flatService.GetAll();
            return Ok(flats);
        }

        [HttpGet("flats/{id}")]
        public async Task<ActionResult<Flat>> GetFlatById([FromRoute] int id)
        {
            var flat = await flatService.GetById(id);
            if (flat == null) return StatusCode(404, new ApiResponse(404, "The flat not found!"));
            return Ok(flat);
        }

        [Authorize]
        [HttpDelete("flats/{id}")]
        public async Task<ActionResult<ApiResponse>> Delete([FromRoute] int id)
        {
            await flatService.Delete(id);
            return StatusCode(200, new ApiResponse(200, "The flat has been deleted"));

        }

        [Authorize]
        [HttpPost("flats")]
        public async Task<ActionResult<ApiResponse>> CreateHouse([FromBody] CreateFlat dto)
        {
            await flatService.Create(dto);
            return StatusCode(200, new ApiResponse(200, "The flat has been created"));
        }

        [HttpGet("flats/price/{id}")]
        public async Task<ActionResult<decimal>> CalculatePrice([FromRoute] int id)
        {
            return await flatService.CalculatePrice(id);
        }
    }
}
