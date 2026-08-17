using RssReader.DTOs.User;

namespace RssReader.Services.Interfaces;

public interface IUserService
{
    Task<UserProfileDto> GetUserProfileAsync(CancellationToken ct = default);
    Task DeleteAccountAsync (CancellationToken ct = default);
    Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateProfileDto dto, CancellationToken ct = default);
}
