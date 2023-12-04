using backend.Entities;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace backend.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }


        public List<House> Houses { get; set; } = new();

        public List<Flat> Flats { get; set; } = new();
    }
}
