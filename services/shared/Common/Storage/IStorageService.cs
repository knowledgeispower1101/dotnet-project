namespace Common.Storage;

public interface IStorageService
{
    Task<string> UploadAsync(
        Stream stream,
        string fileName,
        string contentType,
        string folder,
        long size
    );

    Task DeleteAsync(string objectKey);
}
