using Common.Storage;
using Microsoft.EntityFrameworkCore;
using ProductService.Dtos.Category;
using ProductService.Entities;
using ProductService.Services.Interfaces;
namespace ProductService.Services;

public class CategoryService(AppDbContext context, IStorageService storageService) : ICategoryService
{
    private readonly AppDbContext _context = context;
    private readonly IStorageService _storageService = storageService;
    public async Task<int> CreateAsync(CategoryRequest request, IFormFile file)
    {
        if (file == null || file.Length == 0) throw new BadHttpRequestException("File is empty");
        using var stream = file.OpenReadStream();
        string objectKey = await _storageService.UploadAsync(
            stream,
            file.FileName,
            file.ContentType,
            folder: $"category",
            size: file.Length
        );

        var category = new Category
        {
            Name = request.Name,
            Level = request.Level,
            IsLeaf = request.IsLeaf,
            Url = objectKey
        };
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category.Id;
    }

    public async Task<CategoryResponse[]> Get()
    {
        return await _context.Categories
            .AsNoTracking()
            .Select(c => new CategoryResponse(
                c.Name,
                c.Level,
                c.IsLeaf,
                c.Url
            ))
            .ToArrayAsync();
    }
}