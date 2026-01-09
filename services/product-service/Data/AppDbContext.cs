using Microsoft.EntityFrameworkCore;
using ProductService.Entities;
using Common.Extensions;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductModel> Models => Set<ProductModel>();
    public DbSet<ProductAttribute> Attributes => Set<ProductAttribute>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Variation> Variations => Set<Variation>();
    public DbSet<VariationOption> VariationOptions => Set<VariationOption>();
    public DbSet<Image> Images => Set<Image>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity
                .HasMany(p => p.Attributes)
                .WithOne(a => a.Product)
                .HasForeignKey(a => a.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            entity
                 .HasMany(p => p.Models)
                .WithOne(m => m.Product)
                .HasForeignKey(m => m.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            entity
                .HasMany(p => p.Variations)
                .WithOne(p => p.ProductRef)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity
                .HasMany(brand => brand.Products)
                .WithOne(product => product.BrandRef)
                .HasForeignKey(brand => brand.BrandId)
                .OnDelete(DeleteBehavior.Restrict);
        });


        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            entity.SetTableName(entity.GetTableName()!.ToSnakeCase());

            foreach (var property in entity.GetProperties())
            {
                property.SetColumnName(property.Name.ToSnakeCase());
            }
        }
    }
}
