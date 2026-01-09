namespace ProductService.Services.Interfaces;

using ProductService.Dtos.Product;

public interface IBrandService
{
    Task<int> CreateAsync(ProductRequest request);

}