using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RssReader.DTOs.Auth;
using RssReader.Services.Interfaces;
using System.Security.Claims;

namespace RssReader.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto, CancellationToken ct)
    {
        var result = await authService.RegisterAsync(registerDto, ct);

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto, CancellationToken ct)
    {
        var result = await authService.LoginAsync(loginDto, ct);

        return Ok(result);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(CancellationToken ct)
    {
        await authService.LogoutAsync(ct);

        return Ok(new { message = "Logged out successefully"});
    }

    [Authorize]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto dto, CancellationToken ct)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await authService.ChangePasswordAsync(userId, dto, ct);
        return NoContent();
    }
}
