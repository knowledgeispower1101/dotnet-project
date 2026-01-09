namespace ProductService.Dtos.Product;

public record ProductModelRequest(
    string Name,
    decimal Price,
    string Sku
);