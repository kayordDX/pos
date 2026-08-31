using Microsoft.AspNetCore.SignalR;
using Pos.Api.Services;

namespace Pos.Api.Hubs;

public class UserProvider : IUserIdProvider
{
    private readonly CurrentUserService _cu;

    public UserProvider(CurrentUserService cu)
    {
        _cu = cu;
    }

    public string? GetUserId(HubConnectionContext connection)
    {
        return _cu.UserId;
    }
}
