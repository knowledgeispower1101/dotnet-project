using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace ProductService.Entities;

public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int? ParentId { get; set; }
    public Category? Parent { get; set; }
    public ICollection<Category> Children { get; set; } = [];
    public string Path { get; set; } = string.Empty;
    public int Level { get; set; }
    public bool IsLeaf { get; set; }
    public string? ImageKey { get; set; }
    public ICollection<Product> Products = [];
}