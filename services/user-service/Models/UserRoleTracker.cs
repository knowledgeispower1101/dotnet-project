namespace UserService.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("user_role_tracker")]
public class UserRoleTracker
{
    [Column("user_id")]
    public int UserId { get; set; }

    public User User { get; set; } = null!;

    [Column("user_role_id")]
    public int UserRoleId { get; set; }

    public UserRole UserRole { get; set; } = null!;

    [Column("activate")]
    public bool Activate { get; set; }
}