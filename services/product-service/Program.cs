using Common.Extensions;
using Microsoft.EntityFrameworkCore;
using ProductService.Middleware;
using ProductService.Services;
using ProductService.Services.Interfaces;
using Minio;
using Common.Storage;
using Common.Options;
var builder = WebApplication.CreateBuilder(args);
var minioOptions = builder.Configuration.GetSection("Minio").Get<MinioOptions>()!;

builder.Services.AddSingleton(minioOptions);
builder.Services.AddRedis(builder.Configuration);

builder.Services.AddSingleton(new MinioClient()
    .WithEndpoint(minioOptions.Endpoint)
    .WithCredentials(minioOptions.AccessKey, minioOptions.SecretKey)
    .WithSSL(minioOptions.UseSSL)
    .Build()
);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = new SnakeCaseNamingPolicy();
    options.JsonSerializerOptions.DictionaryKeyPolicy = new SnakeCaseNamingPolicy();
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options
        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<IProductService, EProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IStorageService, MinioStorageService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.Run();
