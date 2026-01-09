using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductService.Entities;

[Table("models")]
public class ProductModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Sku { get; set; } = string.Empty;
    public decimal PriceBeforeDiscount { get; set; } = 0;
    public int ProductId { get; set; }
    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;
}
