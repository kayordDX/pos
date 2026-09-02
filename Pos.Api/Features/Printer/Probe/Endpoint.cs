using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Probe;

public class Endpoint : Endpoint<Request, bool>
{
    private readonly AppDbContext _dbContext;
    private readonly PrintService _printService;
    private readonly UserService _userService;

    public Endpoint(AppDbContext dbContext, PrintService printService, UserService userService)
    {
        _dbContext = dbContext;
        _printService = printService;
        _userService = userService;
    }

    public override void Configure()
    {
        Post("/printer/probe");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        var printer = await _dbContext
            .Printer.Where(x => x.Id == req.PrinterId && x.OutletId == outletId)
            .Select(x => new { x.Id, x.DeviceId })
            .FirstOrDefaultAsync(ct);
        if (printer == null)
        {
            await Send.OkAsync(false, ct);
            return;
        }

        // The dial is performed by a print device, so it must be an active
        // device with a live key for the outlet + device pair owning the printer.
        bool deviceLive = await _dbContext
            .Device.Where(x => x.OutletId == outletId && x.Id == printer.DeviceId && x.KeyId != null && x.RevokedAt == null)
            .AnyAsync(ct);
        if (!deviceLive)
        {
            await Send.OkAsync(false, ct);
            return;
        }

        await _printService.RequestProbe(outletId, printer.DeviceId, printer.Id);
        await Send.OkAsync(true, ct);
    }
}
