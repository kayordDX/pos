using Microsoft.AspNetCore.SignalR;
using Pos.Api.Data;
using Pos.Api.Hubs;

namespace Pos.Api.Features.Notification.User;

public class Endpoint : Endpoint<Request, bool>
{
    private readonly IHubContext<KayordHub, IKayordHub> _hub;

    public Endpoint(IHubContext<KayordHub, IKayordHub> hub)
    {
        _hub = hub;
    }

    public override void Configure()
    {
        Post("/notification/user");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        await _hub.Clients.User(req.UserId).ReceiveMessage(req.Message);
        await _hub.Clients.Group("outlet:1").ReceiveMessage(req.Message);
        await Send.OkAsync(true);
    }
}
