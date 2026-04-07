using Application.Mapping;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;

namespace API_store
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Data Source=APIStore.db"));


            // Controllers
            builder.Services.AddControllers();

            builder.Services.AddAutoMapper(cfg => cfg.AddProfile<Mapping>());

            builder.Services.AddScoped<IProductRepository, ProductRepository>();


            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Store v1");
                c.RoutePrefix = string.Empty; // <- deixa o Swagger na raiz "/"
            });

            app.UseHttpsRedirection();
            app.MapControllers();

            app.Run();
        }
    }
}
