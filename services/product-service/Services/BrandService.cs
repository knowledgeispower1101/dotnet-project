// using System.Text.Json;
// using ProductService.Dtos.Product;
// using ProductService.Entities;

// namespace ProductService.Services;

// public class BrandService(AppDbContext context) : IBrandService
// {
//     private readonly AppDbContext _context = context;

//     public async Task<int> CreateAsync(CreateBrandRequest request)
//     {
//         var brand = new Brand
//         {
//             Name = request.Name
//         };
//         _context.Brands.Add(brand);
//         await _context.SaveChangesAsync();
//         return brand.Id;
//     }
// }