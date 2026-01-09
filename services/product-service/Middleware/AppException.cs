namespace ProductService.Middleware;

public abstract class AppException(string message, int statusCode) : Exception(message)
{
    public int StatusCode { get; } = statusCode;
}


public class NotFoundException(string message) : AppException(message, StatusCodes.Status404NotFound)
{
}

public class BadRequestException(string message) : AppException(message, StatusCodes.Status400BadRequest)
{
}
