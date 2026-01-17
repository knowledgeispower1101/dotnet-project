using Microsoft.EntityFrameworkCore;
using UserService.Data;
using UserService.Models;

namespace ProductService.Seeder;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (await context.Permissions.AnyAsync())
            return;

        List<Permission> permissions = [
            new(){ Value = "READ:profile"},
            new(){ Value = "UPDATE:profile"},
            new(){ Value = "READ:cart"},
            new(){ Value = "UPDATE:cart"},
        ];

        context.Permissions.AddRange(permissions);
        await context.SaveChangesAsync();
    }
}
