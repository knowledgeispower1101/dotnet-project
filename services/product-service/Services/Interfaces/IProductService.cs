using ProductService.Dtos.Product;

namespace ProductService.Services.Interfaces;

public interface IProductService
{
    Task<int> CreateAsync(ProductRequest request);
    Task<ProductResponse> GetProductAsync(int id);
    Task<int> UpdateProductAsync(int id, ProductRequest request);
}