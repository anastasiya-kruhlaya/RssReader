using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RssReader.DTOs.User;
using RssReader.Services.Interfaces;
using System.Security.Claims;

namespace RssReader.Controllers;

[ApiController]
[Authorize]
[Route("api/user")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet("me")]
    public async Task<IActionResult> GetProfile(CancellationToken ct)
    {
        var result = await userService.GetUserProfileAsync(ct);
        return Ok(result);
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto, CancellationToken ct)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var result = await userService.UpdateProfileAsync(userId, dto, ct);
        return Ok(result);
    }

    [HttpDelete("me")]
    public async Task<IActionResult> DeleteAccount(CancellationToken ct)
    {
        await userService.DeleteAccountAsync(ct);
        return NoContent();
    }
}
