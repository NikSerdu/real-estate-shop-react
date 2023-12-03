using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class House: RealEstate
    {
        [Required]

        public bool HasGarage { get; set; }
        [Required]

        public bool HasGarden { get; set; }

        [Required]
        public int GardenArea { get; set; }

        [Required]

        public int? UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; } = default!;
    }
}
