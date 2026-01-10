namespace Common.Storage;

using Common.Options;
using Minio;
using Minio.DataModel.Args;

public class MinioStorageService(
    IMinioClient minio,
    MinioOptions options) : IStorageService
{
    private readonly IMinioClient _minio = minio;
    private readonly MinioOptions _options = options;

    public async Task DeleteAsync(string objectKey)
    {
        if (string.IsNullOrEmpty(objectKey)) return;
        bool bucketExists = await _minio.BucketExistsAsync(
            new BucketExistsArgs().WithBucket(_options.Bucket)
        );
        if (!bucketExists) return;
        await _minio.RemoveObjectAsync(
            new RemoveObjectArgs().WithBucket(_options.Bucket).WithObject(objectKey)
        );
    }

    public async Task<string> UploadAsync(
        Stream stream,
        string fileName,
        string contentType,
        string folder,
        long size)
    {
        var objectName = $"{folder}/{Guid.NewGuid()}_{fileName}";

        bool bucketExists = await _minio.BucketExistsAsync(
            new BucketExistsArgs().WithBucket(_options.Bucket)
        );

        if (!bucketExists) await _minio.MakeBucketAsync(
                new MakeBucketArgs().WithBucket(_options.Bucket)
        );


        await _minio.PutObjectAsync(
            new PutObjectArgs()
                .WithBucket(_options.Bucket)
                .WithObject(objectName)
                .WithStreamData(stream)
                .WithObjectSize(size)
                .WithContentType(contentType)
        );

        return objectName;
    }
}
