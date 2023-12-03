using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Image
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Url { get; set; }
    }
}
