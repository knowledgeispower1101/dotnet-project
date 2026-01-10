namespace Common.Options;

public class RedisOptions
{
    public string ConnectionString { get; set; } = null!;
    public string InstanceName { get; set; } = "default:";
}