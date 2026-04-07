using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class APIResponse<T>
        {
            public IEnumerable<T> Data { get; set; }
            public int TotalCount { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
            public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

            public APIResponse(IEnumerable<T> data, int count, int pageNumber, int pageSize)
            {
                Data = data;
                TotalCount = count;
                PageNumber = pageNumber;
                PageSize = pageSize;
            }
        }
    }
}
