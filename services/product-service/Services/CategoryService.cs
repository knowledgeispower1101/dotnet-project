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
    private readonly static string PARENT_CATEGORIES_KEY = "categories:menu";
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
                c.Id,
                c.Name,
                c.Level,
                c.IsLeaf,
                c.ImageKey
            ))
            .ToArrayAsync();
        return categories;
    }

    public async Task<ICollection<CategoryResponse>> GetCategoryHierachyByProductId(int productId)
    {
        var result = await _context.Database
            .SqlQueryRaw<CategoryResponse>(@"
            WITH RECURSIVE category_tree AS (
                SELECT c.id, c.name, c.level, c.is_leaf, c.image_key, c.parent_id
                FROM products p
                JOIN categories c ON p.category_id = c.id
                WHERE p.id = @productId
                UNION ALL
                SELECT parent.id, parent.name, parent.level, parent.is_leaf, parent.image_key, parent.parent_id
                FROM categories parent
                JOIN category_tree ct ON ct.parent_id = parent.id
            )
            SELECT
                id,
                name,
                level,
                is_leaf AS ""IsLeaf"",
                image_key AS ""ImageKey""
            FROM category_tree
            ORDER BY level;
        ",
            new Npgsql.NpgsqlParameter("productId", productId)
            )
            .AsNoTracking()
            .ToListAsync();

        if (result.Count == 0)
            throw new NotFoundException("Product not found");

        return result;
    }



    private static string CATEGORY_TREE_BY_PRODUCT_KEY(int productId) => $"categories:tree:product:{productId}";

    public async Task<ICollection<CategoryResponse>> GetCategoryMenu()
    {
        var cached = await _cacheService.GetAsync<ICollection<CategoryResponse>>(PARENT_CATEGORIES_KEY);
        if (cached != null) return cached;

        var result = await _context.Database
            .SqlQueryRaw<CategoryResponse>(@"
            SELECT 
                id,
                name,
                level,
                is_leaf AS ""IsLeaf"",
                image_key AS ""ImageKey""
            FROM categories
            WHERE level = 0
        ")
            .AsNoTracking()
            .ToListAsync();

        await _cacheService.SetAsync(
            PARENT_CATEGORIES_KEY,
            result,
            TimeSpan.FromHours(24)
        );

        return result;
    }

}