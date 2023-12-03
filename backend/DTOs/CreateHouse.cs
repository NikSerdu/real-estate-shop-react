using backend.Entities;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateHouse
    {
        [Required]

        public int Price { get; set; }


        [Required]
        public int GardenArea { get; set; }

        [Required]
        public List<Image> Images { get; set; }

        [Required]

        public string? Title { get; set; }


        [Required]

        public string NumberOfPhone { get; set; }

        [Required]

        public decimal CreatedAt { get; set; }
        [Required]

        public string Type { get; set; }
        [Required]

        public int Area { get; set; }
        [Required]

        public int Rooms { get; set; }
        [Required]

        public string? Description { get; set; }
        [Required]

        public string? Address { get; set; }
        [Required]

        public bool HasGarage { get; set; }
        [Required]

        public bool HasGarden { get; set; }
        [Required]


        public int? UserId { get; set; }

        public House ToDomain()
        {
            return new House
            {
                Price = this.Price,
                Area = this.Area,
                Rooms = this.Rooms,
                Description = this.Description,
                Address = this.Address,
                HasGarage = this.HasGarage,
                HasGarden = this.HasGarden,
                UserId = this.UserId,
                CreatedAt = this.CreatedAt,
                Title = this.Title,
                Type = this.Type,
                Images = this.Images.Select(url => new Image { Url = url.Url }).ToList(),
                NumberOfPhone = this.NumberOfPhone,
                GardenArea = this.GardenArea
            };
        }

    }
}
