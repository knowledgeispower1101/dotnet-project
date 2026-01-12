using ProductService.Dtos.Category;

namespace ProductService.Services.Interfaces;

public interface ICategoryService
{
    Task<int> UpsertCategoryAsync(CategoryRequest request, IFormFile file);
    Task<CategoryResponse[]> Get();
    Task<ICollection<CategoryResponse>> GetCategoryHierachyByProductId(int ProductId);
    Task<ICollection<CategoryResponse>> GetCategoryMenu();
}