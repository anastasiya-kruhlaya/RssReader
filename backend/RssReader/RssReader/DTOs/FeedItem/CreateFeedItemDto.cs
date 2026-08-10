namespace RssReader.DTOs.FeedItem;

public class CreateFeedItemDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Link { get; set; } = string.Empty;
    public DateTime PublishDate { get; set; } = DateTime.UtcNow;
    public string? IconUrl { get; set; }
    public string? Attachments { get; set; }
}
