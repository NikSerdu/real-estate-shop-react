using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Flat: RealEstate
    {
        [Required]
        public bool HasBalcony { get; set; }
        [Required]

        public int Floor {  get; set; }
        [Required]

        public int? UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; } = default!;

    }
}
