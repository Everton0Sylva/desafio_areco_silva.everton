using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_store.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAll()
        {
            var products = await _repository.GetAll();
            var productsDTO = _mapper.Map<IEnumerable<ProductDTO>>(products);
            return Ok(productsDTO);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetById(Guid id)
        {
            var product = await _repository.GetById(id);
            if (product == null)
                return NotFound();

            var productDTO = _mapper.Map<ProductDTO>(product);
            return Ok(productDTO);
        }

        // POST: api/product
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> Create(ProductDTO dto)
        {
            var product = _mapper.Map<Product>(dto);
            product.Id = Guid.NewGuid();

            await _repository.Add(product);

            var productDTO = _mapper.Map<ProductDTO>(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, productDTO);
        }

        // PUT: api/product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, ProductDTO dto)
        {
            if (id != dto.Id)
                return BadRequest("Id not found");

            var product = _mapper.Map<Product>(dto);
            await _repository.Update(product);

            return Ok();
        }

        // DELETE: api/product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _repository.Delete(id);
            return Ok();
        }
    }
}
