using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Pos.Api.Common.Wrapper;
using Pos.Api.Events;
using Pos.Api.Services;

namespace Pos.Api.Hubs;

public interface IKayordHub
{
    Task ReceiveMessage(string message);
    Task PayMessage(Result<Features.Pay.Dto.StatusResultDto> request);
    Task Notification(SignalEvent notification);
    Task PlaySound(SoundEvent sound);
    Task PrinterStatusChanged(PrinterStatusChangedEvent status);
    Task RefreshOutlet(int outletId);
    Task DeviceAuth(DeviceAuthEvent deviceAuthEvent);
}

[Authorize]
public class KayordHub : Hub<IKayordHub>
{
    private readonly RedisClient _redisClient;

    public KayordHub(RedisClient redisClient)
    {
        _redisClient = redisClient;
    }

    public async Task JoinGroup(string group)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, group);
    }

    public async Task LeaveGroup(string group)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
    }

    // Create OTP and send to client. Save To Redis.
    // Anonymous so an unauthenticated device can request a link code; everything
    // else on this hub requires an authenticated user.
    [AllowAnonymous]
    public async Task GetToken()
    {
        string otp = Common.Utils.GenerateOTP();

        TimeSpan expire = TimeSpan.FromMinutes(5);
        DateTime expireDate = DateTime.Now.AddMinutes(5);

        // Bind the OTP to the connection that created it so the login token is
        // only ever pushed back to that exact connection.
        await _redisClient.SetObjectAsync($"auth:{otp}", new DeviceAuthEvent { ExpireDate = expireDate, OTP = otp, ConnectionId = Context.ConnectionId }, expire);

        await Clients.Caller.DeviceAuth(new DeviceAuthEvent() { OTP = otp, ExpireDate = DateTime.Now.AddMinutes(5) });
    }
}
