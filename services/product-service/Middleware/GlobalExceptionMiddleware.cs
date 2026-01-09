using System.Text.Json;
namespace ProductService.Middleware;

public class GlobalExceptionMiddleware(
    RequestDelegate next,
    ILogger<GlobalExceptionMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            context.Response.ContentType = "application/json";

            var statusCode = ex is AppException appEx
                ? appEx.StatusCode
                : StatusCodes.Status500InternalServerError;

            context.Response.StatusCode = statusCode;

            var response = new
            {
                statusCode,
                message = ex is AppException ? ex.Message : "Internal server error",
                timestamp = DateTime.UtcNow
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
    }
}


