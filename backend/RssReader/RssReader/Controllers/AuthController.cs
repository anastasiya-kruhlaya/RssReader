using Microsoft.AspNetCore.Mvc;
using RssReader.DTOs.Auth;
using RssReader.Services.Interfaces;

namespace RssReader.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto, CancellationToken ct)
    {
        try
        {
            var result = await authService.RegisterAsync(registerDto, ct);

            return Ok(result);
        }

        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto, CancellationToken ct)
    {
        try
        {
            var result = await authService.LoginAsync(loginDto, ct);

            return Ok(result);
        }

        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}
