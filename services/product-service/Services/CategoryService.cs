using Common.Caching;
using Common.Storage;
using Microsoft.EntityFrameworkCore;
using ProductService.Dtos.Category;
using ProductService.Entities;
using ProductService.Middleware;
using ProductService.Services.Interfaces;
namespace ProductService.Services;

public class CategoryService(AppDbContext context, IStorageService storageService, ICacheService cacheService) : ICategoryService
{
    private readonly static string PARENT_CATEGORIES_KEY = "categories:parent";

    private readonly AppDbContext _context = context;
    private readonly IStorageService _storageService = storageService;

    private readonly ICacheService _cacheService = cacheService;
    public async Task<int> CreateParentCategoryAsync(CategoryRequest request, IFormFile file)
    {
        if (file == null || file.Length == 0) throw new NotFoundException("File is empty");
        var category = new Category
        {
            Name = request.Name,
            Level = 0,
            IsLeaf = false
        };
        string? objectKey = null;
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            using var stream = file.OpenReadStream();
            objectKey = await _storageService.UploadAsync(
                stream,
                file.FileName,
                file.ContentType,
                folder: $"category",
                size: file.Length
            );
            category.ImageKey = objectKey;
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            await _cacheService.RemoveAsync(PARENT_CATEGORIES_KEY);
            return category.Id;
        }
        catch (System.Exception)
        {
            await transaction.RollbackAsync();
            if (!string.IsNullOrEmpty(objectKey)) await _storageService.DeleteAsync(objectKey);
            throw;
        }
    }

    public async Task<CategoryResponse[]> Get()
    {
        var cachedCategories =
            await _cacheService.GetAsync<CategoryResponse[]>(PARENT_CATEGORIES_KEY);

        if (cachedCategories != null)
            return cachedCategories;

        var categories = await _context.Categories
            .AsNoTracking()
            .Select(c => new CategoryResponse(
                c.Name,
                c.Level,
                c.IsLeaf,
                c.ImageKey
            ))
            .ToArrayAsync();

        await _cacheService.SetAsync(
            PARENT_CATEGORIES_KEY,
            categories,
            TimeSpan.FromHours(24)
        );
        return categories;
    }
}