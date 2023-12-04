
using backend.Auth;
using backend.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Flat> Flats { get; set; }

        public DbSet<House> Houses { get; set; }

        public DbSet<Image> Images { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<House>()
       .HasOne(r => r.User)
       .WithMany(u => u.Houses)
       .HasForeignKey(r => r.UserId)
       .HasPrincipalKey(u => u.Id)  // Specify the principal key of the User entity
       .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Flat>()
      .HasOne(r => r.User)
      .WithMany(u => u.Flats)
      .HasForeignKey(r => r.UserId)
      .HasPrincipalKey(u => u.Id)  // Specify the principal key of the User entity
      .OnDelete(DeleteBehavior.Restrict);
            /*modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());*/
        }
    }
}


