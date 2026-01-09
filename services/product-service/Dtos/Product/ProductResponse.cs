namespace ProductService.Dtos.Product;

public class ProductResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int? BrandId { get; set; }
    public string? BrandName { get; set; }
    public List<ProductModelResponse> Models { get; set; } = [];
    public ICollection<VariationDto> Variations { get; set; } = [];
}

public class ProductModelResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
    public string Sku { get; set; } = string.Empty;
}

public class ProductResponseDetail
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

}