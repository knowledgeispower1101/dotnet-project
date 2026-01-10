using ProductService.Dtos.Category;

namespace ProductService.Services.Interfaces;

public interface ICategoryService
{
    Task<int> CreateParentCategoryAsync(CategoryRequest request, IFormFile file);
    Task<CategoryResponse[]> Get();
}