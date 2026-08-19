using System.Security.Claims;

namespace RssReader.Services;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor)
{
    public int UserId
    {
        get
        {
            Claim? userIdClaim = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim is null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                throw new UnauthorizedAccessException("No authenticated user found.");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new InvalidOperationException($"User id claim '{userIdClaim.Value}' is not a valid integer.");
            }

            return userId;
        }
    }
}
