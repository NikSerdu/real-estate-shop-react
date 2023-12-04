using backend.Auth;
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

        

    }
}
