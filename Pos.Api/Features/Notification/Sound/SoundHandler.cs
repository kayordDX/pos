using Microsoft.AspNetCore.SignalR;
using Pos.Api.Events;
using Pos.Api.Hubs;
using Pos.Api.Services;

namespace Pos.Api.Features.Notification.Sound;

public class SoundHandler(IServiceScopeFactory scopeFactory) : IEventHandler<SoundEvent>
{
    private readonly IServiceScopeFactory _scopeFactory = scopeFactory;

    public async Task HandleAsync(SoundEvent eventModel, CancellationToken ct)
    {
        using var scope = _scopeFactory.CreateScope();
        var hub = scope.Resolve<IHubContext<KayordHub, IKayordHub>>();

        if (hub == null)
        {
            throw new Exception("Dependency injection failed");
        }

        await hub.Clients.Group($"outlet:{eventModel.OutletId}").PlaySound(eventModel);
    }
}
