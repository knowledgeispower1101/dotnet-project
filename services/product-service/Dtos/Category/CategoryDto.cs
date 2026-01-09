namespace ProductService.Dtos.Category;

public record CategoryRequest(
    string Name,
    int Level,
    bool IsLeaf
);


public record CategoryResponse(
    string Name,
    int Level,
    bool IsLeaf,
    string? Url
);
