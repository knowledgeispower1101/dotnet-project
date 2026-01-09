namespace ProductService.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
[Table("variation_options")]
public class VariationOption
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public int VariationId { get; set; }
    public required Variation Variation { get; set; }
}