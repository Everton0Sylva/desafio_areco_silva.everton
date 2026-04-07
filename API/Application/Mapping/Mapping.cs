using Application.DTOs;
using Domain.Entities;
using AutoMapper;

namespace Application.Mapping
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            // Entidade -> DTO
            CreateMap<Product, ProductDTO>();

            // DTO -> Entidade
            CreateMap<ProductDTO, Product>();
        }
    }
}