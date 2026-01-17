namespace UserService.Data;

using Microsoft.EntityFrameworkCore;
using UserService.Models;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();

    public DbSet<UserRoleTracker> UserRoleTrackers => Set<UserRoleTracker>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserRoleTracker>()
                    .HasKey(x => new { x.UserId, x.UserRoleId });

        modelBuilder.Entity<UserRoleTracker>()
                    .HasOne(x => x.User)
                    .WithMany(u => u.UpdateHistories)
                    .HasForeignKey(x => x.UserId);

        modelBuilder.Entity<UserRoleTracker>()
                    .HasOne(x => x.UserRole)
                    .WithMany(r => r.UpdateHistories)
                    .HasForeignKey(x => x.UserRoleId);
    }
}
