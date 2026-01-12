using Common.Caching;
using Common.Storage;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ProductService.Dtos.Category;
using ProductService.Entities;
using ProductService.Middleware;
using ProductService.Services.Interfaces;
namespace ProductService.Services;

public class CategoryService(AppDbContext context, IStorageService storageService, ICacheService cacheService) : ICategoryService
{
    private readonly static string PARENT_CATEGORIES_KEY = "categories:parent";
    private readonly static string CATEGORY_ADDRESS_FOLDER = "category";
    private readonly AppDbContext _context = context;
    private readonly IStorageService _storageService = storageService;
    private readonly ICacheService _cacheService = cacheService;
    public async Task<int> UpsertCategoryAsync(CategoryRequest request, IFormFile file)
    {
        Category category;
        string? newObjectKey = null;
        string? oldObjectKey = null;
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            if (request.Id != null)
            {
                category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Id == request.Id && c.Level == request.Level)
                    ?? throw new NotFoundException("Category not found");

                category.Name = request.Name;

                if (file != null && file.Length > 0)
                {
                    oldObjectKey = category.ImageKey;

                    using var stream = file.OpenReadStream();
                    newObjectKey = await _storageService.UploadAsync(
                        stream,
                        file.FileName,
                        file.ContentType,
                        folder: CATEGORY_ADDRESS_FOLDER,
                        size: file.Length
                    );

                    category.ImageKey = newObjectKey;
                }
            }
            else
            {
                if (file == null || file.Length == 0) throw new BadRequestException("Category image is required");

                category = new Category
                {
                    Name = request.Name,
                    Level = request.Level,
                    IsLeaf = request.IsLeaf,
                };
                if (request.IsLeaf && request.Level != 0)
                {
                    category.ParentId = request.ParentId;
                }
                using var stream = file.OpenReadStream();
                newObjectKey = await _storageService.UploadAsync(
                    stream,
                    file.FileName,
                    file.ContentType,
                    folder: CATEGORY_ADDRESS_FOLDER,
                    size: file.Length
                );
                category.ImageKey = newObjectKey;
                _context.Categories.Add(category);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            await _cacheService.RemoveAsync(PARENT_CATEGORIES_KEY);
            if (!string.IsNullOrEmpty(oldObjectKey)) await _storageService.DeleteAsync(oldObjectKey);

            return category.Id;
        }
        catch
        {
            await transaction.RollbackAsync();

            if (!string.IsNullOrEmpty(newObjectKey))
                await _storageService.DeleteAsync(newObjectKey);

            throw;
        }
    }

    public async Task<CategoryResponse[]> Get()
    {
        var cachedCategories = await _cacheService.GetAsync<CategoryResponse[]>(PARENT_CATEGORIES_KEY);

        if (cachedCategories != null) return cachedCategories;

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

    public async Task<ICollection<CategoryResponse>> GetCategoryHierachyByProductId(int ProductId)
    {
        var category = await _context.Products.AsNoTracking().Where(p => p.Id == ProductId).Select(p => p.CategoryRef).FirstOrDefaultAsync() ?? throw new NotFoundException("Product not found");
        var result = new List<CategoryResponse>();
        while (category != null)
        {
            result.Add(new CategoryResponse(
                category.Name,
                category.Level,
                category.IsLeaf,
                category.ImageKey
            ));
            if (category.ParentId == null) break;
            category = await _context.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == category.ParentId);
        }
        result.Reverse();
        return result;
    }
}