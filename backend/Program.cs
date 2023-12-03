
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(x => x.UseSqlite("Data source=home.db"));



builder.Services.AddScoped<AbstractRealEstateService<House,CreateHouse>, HouseService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<AbstractRealEstateService<Flat,CreateFlat>, FlatService>();
builder.Services.AddScoped<IRealEstateService, RealEstateService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
