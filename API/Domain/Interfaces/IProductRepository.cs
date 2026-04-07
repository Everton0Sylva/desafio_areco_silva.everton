using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IProductRepository
    {
            Task<Product> GetById(Guid id);
            Task<IEnumerable<Product>> GetAll();
            Task Add(Product product);
            Task Update(Product product);
            Task Delete(Guid id);        
    }
}
