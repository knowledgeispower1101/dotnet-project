namespace ProductService.Entities;

public class Image
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? Alt { get; set; }
    public int? Order { get; set; }

    public string EntityType { get; set; } = string.Empty;
    public int EntityId { get; set; }
}
