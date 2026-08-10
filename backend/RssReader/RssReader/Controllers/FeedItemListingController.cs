using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RssReader.Constants;
using RssReader.DTOs.FeedItem;
using RssReader.Services.Interfaces;

namespace RssReader.Controllers;

[ApiController]
[Authorize]
[Route("api/feed/{feedId:int}/feed-items")]
public class FeedItemListingController(IFeedItemService feedItemService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetItems(
        int feedId,
        [FromQuery] int pageNumber = PaginationConstants.DefaultPageNumber,
        [FromQuery] int pageSize = PaginationConstants.DefaultPageSize,
        CancellationToken ct = default)
    {
        var result = await feedItemService.GetFeedItemsByFeedIdAsync(feedId, pageNumber, pageSize, ct);

        return Ok(result);
    }

    [HttpGet("grouped")]
    public async Task<IActionResult> GetItemsGrouped(
        int feedId,
        [FromQuery] int pageNumber = PaginationConstants.DefaultPageNumber,
        [FromQuery] int pageSize = PaginationConstants.DefaultPageSize,
        CancellationToken ct = default)
    {
        var result = await feedItemService.GetFeedItemsGroupedByFeedIdAsync(
            feedId,
            pageNumber,
            pageSize,
            ct);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateItem(
       int feedId,
       CreateFeedItemDto createFeedItemDto,
       CancellationToken ct = default)
    {
        var result = await feedItemService.CreateFeedItemAsync(feedId, createFeedItemDto, ct);
        return Ok(result);
    }
}
