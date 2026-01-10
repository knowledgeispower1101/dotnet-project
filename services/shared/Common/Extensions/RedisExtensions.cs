using Common.Caching;
using Common.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Extensions;

public static class RedisExtension
{
    public static IServiceCollection AddRedis(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var redisOptions = configuration
            .GetSection("Redis")
            .Get<RedisOptions>()
            ?? throw new Exception("Redis options not configured");

        services.AddSingleton(redisOptions);

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisOptions.ConnectionString;
            options.InstanceName = redisOptions.InstanceName;
        });
        services.AddSingleton<ICacheService, RedisCacheService>();
        return services;
    }
}
