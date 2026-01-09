namespace ProductService.Dtos.Product;

public class VariationDto()
{
    public int? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<VariationOptionDto> VariationOption { get; set; } = [];
}


public class VariationOptionDto()
{
    public int? Id { get; set; }
    public string Value { get; set; } = string.Empty;
}