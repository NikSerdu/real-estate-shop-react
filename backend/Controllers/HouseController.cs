using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class HouseController:BaseController<HouseController>
    {
        private readonly AbstractRealEstateService<House,CreateHouse> houseService;

        public HouseController(AbstractRealEstateService<House, CreateHouse> houseService)
        {
            this.houseService = houseService;
        }

        [HttpGet("houses")]
        public async Task<ActionResult<IReadOnlyList<House>>> GetAllHouses()
        {
            var houses = await houseService.GetAll();
            return Ok(houses);
        }

        [HttpGet("houses/{id}")]
        public async Task<ActionResult<House>> GetHouseById([FromRoute] int id)
        {
            var house = await houseService.GetById(id);
            if (house == null) return StatusCode(404, new ApiResponse(404, "The house not found!"));
            return Ok(house);
        }


        [HttpDelete("houses/{id}")]
        public async Task<ActionResult<ApiResponse>> Delete([FromRoute] int id)
        {
            await houseService.Delete(id);
            return StatusCode(200, new ApiResponse(200, "The house has been deleted"));

        }

        [HttpPost("houses")]
        public async Task<ActionResult<ApiResponse>> CreateHouse([FromBody] CreateHouse dto)
        {
            await houseService.Create(dto);
            return StatusCode(200, new ApiResponse(200, "The house has been created"));
        }

        [HttpGet("houses/price/{id}")]
        public async Task<ActionResult<decimal>> CalculatePrice([FromRoute] int id)
        {
            return await houseService.CalculatePrice(id);
        }
    }
}
