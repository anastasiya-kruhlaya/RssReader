using RssReader.DTOs.Auth;

namespace RssReader.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto, CancellationToken ct = default);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto, CancellationToken ct = default);
    Task LogoutAsync(CancellationToken ct = default);
    Task ChangePasswordAsync(int userId, ChangePasswordDto dto, CancellationToken ct = default);
}
