using Domain.Entities;
using Microsoft.EntityFrameworkCore;
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
        Task Add(Product product);
        Task Update(Product product);
        Task Delete(Guid id);
        Task<IEnumerable<Product>> GetPage(int pageNumber, int pageSize);
        Task<int> Count();

    }
}
