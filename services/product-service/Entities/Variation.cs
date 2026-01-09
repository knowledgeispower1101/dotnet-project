namespace ProductService.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
[Table("variations")]
public class Variation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int? ProductId { get; set; }
    public Product? ProductRef { get; set; }
    public ICollection<VariationOption> VariationOptions { get; set; } = [];
}