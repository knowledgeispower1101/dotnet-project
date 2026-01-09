namespace ProductService.Dtos.Common;

public class BaseResponse<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public string? Message { get; init; }

    public static BaseResponse<T> Ok(T data, string? message = null)
        => new()
        {
            Success = true,
            Data = data,
            Message = message
        };

    public static BaseResponse<T> Fail(string message)
        => new()
        {
            Success = false,
            Message = message
        };
}
