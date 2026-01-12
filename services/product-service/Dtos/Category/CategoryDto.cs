namespace ProductService.Dtos.Category;

public record CategoryRequest(
    int? Id,
    string Name,
    int Level,
    bool IsLeaf,
    string? ImageKey,
    string? Path,
    int ParentId = 0
);


public record CategoryResponse(
   int Id,
    string Name,
    int Level,
    bool IsLeaf,
    string? ImageKey
);
