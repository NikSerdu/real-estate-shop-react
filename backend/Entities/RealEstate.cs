using backend.Auth;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public abstract class RealEstate:BaseEntity
    {

	 [Required]

        public string? Title{ get; set; }

        [Required]

        public decimal CreatedAt { get; set; }

        [Required]

        public string NumberOfPhone { get; set; }

        [Required]

        public string? Type{ get; set; }

        public int Price { get; set; }
        [Required]

        public int Area { get; set; }
        [Required]

        public int Rooms { get; set; }
        [Required]

        public string? Description { get; set; }
        [Required]

        public string? Address { get; set; }

        [Required]
        public List<Image> Images { get; set; }

        [Required]
        public string? UserId { get; set; }

        [JsonIgnore]
        public ApplicationUser User { get; set; }

    }
}
