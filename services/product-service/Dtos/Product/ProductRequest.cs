namespace ProductService.Dtos.Product;

public record ProductRequest(
    int? Id,
    string Title,
    string Description,
    int? BrandId,
    List<ProductModelRequest> Models,
    List<VariationDto> Variation
);
