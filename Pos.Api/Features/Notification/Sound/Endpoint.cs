using Pos.Api.Events;
using Pos.Api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Pos.Api.Features.Notification.Sound;

public class Endpoint : EndpointWithoutRequest<bool>
{

    public Endpoint()
    {
    }

    public override void Configure()
    {
        Post("/notification/sound");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await PublishAsync(new SoundEvent() { OutletId = 1, DivisionIds = [2] });
        await Send.OkAsync(true);
    }
}
