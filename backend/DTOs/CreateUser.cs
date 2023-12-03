using backend.Entities;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateUser
    {
        [Required]

        public string Email { get; set; } = default!;
        [Required]
        public string Name { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;


        public User ToDomain()
        {
            return new User
            {
               Email = this.Email,
               Name = this.Name,
               Password = this.Password
            };
        }

    }
}
