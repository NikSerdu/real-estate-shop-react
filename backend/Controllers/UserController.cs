/*using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class UserController : BaseController<HouseController>
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("users")]
        public async Task<ActionResult<IReadOnlyList<User>>> GetAllHouses()
        {
            var users = await userService.GetAllUsers();
            return Ok(users);
        }

        

        [HttpPost("users")]
        public async Task<ActionResult<ApiResponse>> CreateHouse([FromBody] CreateUser dto)
        {
            await userService.Register(dto);
            return StatusCode(200, new ApiResponse(200, "User has created"));
        }
    }
}
*/