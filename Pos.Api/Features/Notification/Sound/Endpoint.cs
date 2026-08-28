using Pos.Api.Events;

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
        await PublishAsync(new SoundEvent() { OutletId = 1, DivisionIds = [2] }, cancellation: ct);
        await Send.OkAsync(true, ct);
    }
}
