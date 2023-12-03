using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class User:BaseEntity
    {
        [Required]

        public string? Name { get; set; }
        [Required]

        public string? Email { get; set; }
        [Required]

        public string? Password { get; set; }
        [Required]

        [JsonIgnore]
        public List<House> Houses { get; set; } = new();
        [JsonIgnore]
        public List<Flat> Flats { get; set; } = new();

    }
}
