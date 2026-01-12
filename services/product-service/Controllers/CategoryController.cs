using Microsoft.AspNetCore.Mvc;
using ProductService.Dtos.Common;
using ProductService.Dtos.Category;
using ProductService.Services.Interfaces;

namespace ProductService.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController(ICategoryService _categoryService) : ControllerBase
{
    private readonly ICategoryService categoryService = _categoryService;
    [HttpPost]
    public async Task<IActionResult> CreateAndUpdateCategory([FromForm] CategoryRequest request, [FromForm] IFormFile file)
    {
        int idCategory = await categoryService.UpsertCategoryAsync(request, file);
        return Ok(BaseResponse<int>.Ok(idCategory, $"Category with id: {idCategory} is created"));
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await categoryService.Get();
        return Ok(BaseResponse<CategoryResponse[]>.Ok(categories, "Fetch Data"));
    }
    [HttpGet("tree/by-product/{productId}")]
    public async Task<IActionResult> GetCategoriesTree(int productId)
    {
        var categoriesTree = await categoryService.GetCategoryHierachyByProductId(productId);
        return Ok(BaseResponse<CategoryResponse[]>.Ok([.. categoriesTree], "Fetch Data"));
    }
}