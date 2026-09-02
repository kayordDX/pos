using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.DeviceInfo;

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
        Post("/printer/device-info");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        // The report is gathered by a print device, so there must be an active
        // device with a live key for the outlet + device pair being asked to report.
        bool deviceExists = await _dbContext
            .Device.Where(x => x.OutletId == outletId && x.Id == req.DeviceId && x.KeyId != null && x.RevokedAt == null)
            .AnyAsync(ct);
        if (!deviceExists)
        {
            await Send.OkAsync(false, ct);
            return;
        }

        // Ask the device to collect its machine details (hostname, platform,
        // versions, network interfaces) and report them back over the hub.
        await _printService.RequestDeviceInfo(outletId, req.DeviceId);
        await Send.OkAsync(true, ct);
    }
}
