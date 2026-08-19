namespace RssReader.DTOs.Feed;

public class UpdateFeedDto
{
    public string Url { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? IconUrl { get; set; }
}
