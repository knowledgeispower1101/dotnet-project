using Microsoft.EntityFrameworkCore;
using ProductService.Dtos.Product;
using ProductService.Entities;
using ProductService.Middleware;
using ProductService.Services.Interfaces;

namespace ProductService.Services;

public class EProductService(AppDbContext context) : IProductService
{
    private readonly AppDbContext _context = context;

    public async Task<int> CreateAsync(ProductRequest request)
    {
        var product = new Product
        {
            Title = request.Title,
            Description = request.Description,
            BrandId = request.BrandId,
            Models = [],
            Variations = []
        };

        foreach (var m in request.Models)
        {
            product.Models.Add(new ProductModel
            {
                Name = m.Name,
                Price = m.Price,
                Sku = m.Sku,
                Product = product
            });
        }

        foreach (var v in request.Variation)
        {
            var variation = new Variation
            {
                Name = v.Name,
                ProductRef = product,
                VariationOptions = []
            };

            foreach (var o in v.VariationOption)
            {
                variation.VariationOptions.Add(new VariationOption
                {
                    Value = o.Value,
                    Variation = variation
                });
            }

            product.Variations.Add(variation);
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product.Id;
    }

    public async Task<ProductResponse> GetProductAsync(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.Models)
            .Include(p => p.Attributes)
            .Include(p => p.BrandRef)
            .Include(p => p.Variations)
            .ThenInclude(v => v.VariationOptions)
            .FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new NotFoundException($"Product with id: {id} not found");

        return new ProductResponse
        {
            Id = product.Id,
            Title = product.Title,
            Description = product.Description,
            Models = [.. product.Models.Select(m => new ProductModelResponse{
                Id = m.Id,
                Name = m.Name,
                Price = m.Price,
                Sku = m.Sku
            })],
            Variations = [.. product.Variations.Select(v => new VariationDto
            {
                Id = v.Id,
                Name = v.Name,
                VariationOption = [.. v.VariationOptions.Select(o => new VariationOptionDto
                    {
                        Id = o.Id,
                        Value = o.Value
                    })]
            })]
        };
    }

    public Task<int> UpdateProductAsync(int id, ProductRequest request)
    {
        var data = new
        {

        };
        throw new NotImplementedException();
    }
}
