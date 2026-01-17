using Microsoft.EntityFrameworkCore;
using ProductService.Entities;

namespace ProductService.Seeder;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Nếu đã có data thì không seed nữa
        if (await context.Categories.AnyAsync())
            return;

        var categories = new List<Category>
        {
            new() { Name = "Thời Trang Nam", Level = 0, IsLeaf = false },
            new() { Name = "Thời Trang Nữ", Level = 0, IsLeaf = false },
            new() { Name = "Điện Thoại & Phụ Kiện", Level = 0, IsLeaf = false },
            new() { Name = "Mẹ & Bé", Level = 0, IsLeaf = false },
            new() { Name = "Thiết Bị Điện Tử", Level = 0, IsLeaf = false },
            new() { Name = "Nhà Cửa & Đời Sống", Level = 0, IsLeaf = false },
            new() { Name = "Máy Tính & Laptop", Level = 0, IsLeaf = false },
            new() { Name = "Sắc Đẹp", Level = 0, IsLeaf = false },
            new() { Name = "Máy Ảnh & Máy Quay Phim", Level = 0, IsLeaf = false },
            new() { Name = "Sức Khỏe", Level = 0, IsLeaf = false },
            new() { Name = "Đồng Hồ", Level = 0, IsLeaf = false },
            new() { Name = "Giày Dép Nữ", Level = 0, IsLeaf = false },
            new() { Name = "Giày Dép Nam", Level = 0, IsLeaf = false },
            new() { Name = "Túi Ví Nữ", Level = 0, IsLeaf = false },
            new() { Name = "Thiết Bị Điện Gia Dụng", Level = 0, IsLeaf = false },
            new() { Name = "Phụ Kiện & Trang Sức Nữ", Level = 0, IsLeaf = false },
            new() { Name = "Thể Thao & Du Lịch", Level = 0, IsLeaf = false },
            new() { Name = "Bách Hóa Online", Level = 0, IsLeaf = false },
            new() { Name = "Ô Tô & Xe Máy & Xe Đạp", Level = 0, IsLeaf = false },
            new() { Name = "Nhà Sách Online", Level = 0, IsLeaf = false },
            new() { Name = "Balo & Túi Ví Nam", Level = 0, IsLeaf = false },
            new() { Name = "Thời Trang Trẻ Em", Level = 0, IsLeaf = false },
            new() { Name = "Đồ Chơi", Level = 0, IsLeaf = false },
            new() { Name = "Giặt Giũ & Chăm Sóc Nhà Cửa", Level = 0, IsLeaf = false },
            new() { Name = "Chăm Sóc Thú Cưng", Level = 0, IsLeaf = false },
            new() { Name = "Voucher & Dịch Vụ", Level = 0, IsLeaf = false },
            new() { Name = "Dụng cụ và thiết bị tiện ích", Level = 0, IsLeaf = false },
        };

        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();
    }
}
