namespace RssReader.DTOs.Feed;

public class CreateFeedDto
{
    public string Url { get; set; } = string.Empty;
    public List<int>? FolderIds { get; set; }
    public string? IconUrl { get; set; }
    public string Title { get; set; } = string.Empty;
}
