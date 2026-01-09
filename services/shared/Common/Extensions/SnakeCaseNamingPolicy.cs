using System.Text;
using System.Text.Json;
namespace Common.Extensions;

public sealed class SnakeCaseNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        if (string.IsNullOrEmpty(name))
            return name;

        var sb = new StringBuilder();

        for (int i = 0; i < name.Length; i++)
        {
            if (char.IsUpper(name[i]))
            {
                if (i > 0)
                    sb.Append('_');

                sb.Append(char.ToLowerInvariant(name[i]));
            }
            else
            {
                sb.Append(name[i]);
            }
        }

        return sb.ToString();
    }
}