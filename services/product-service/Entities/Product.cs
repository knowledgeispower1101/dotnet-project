using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductService.Entities;

[Table("products")]
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    public int ShopId { get; set; }
    public string Description { get; set; } = string.Empty;
    public int? BrandId { get; set; }
    public Brand? BrandRef { get; set; }
    public ICollection<ProductModel> Models { get; set; } = [];
    public ICollection<ProductAttribute> Attributes { get; set; } = [];
    public ICollection<Variation> Variations { get; set; } = [];
    public ICollection<Image> Images { get; set; } = [];
}