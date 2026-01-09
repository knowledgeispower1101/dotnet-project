using ProductService.Dtos.Category;

namespace ProductService.Services.Interfaces;

public interface ICategoryService
{
    Task<int> CreateAsync(CategoryRequest request, IFormFile file);
    Task<CategoryResponse[]> Get();
}