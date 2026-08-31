using Microsoft.EntityFrameworkCore;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Scan;

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
        Post("/printer/scan");
        Policies(Constants.Policy.Manager);
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        int outletId = await _userService.GetOutletId();

        // A scan is executed by a print device, so there must be an active key
        // for the outlet + device pair being asked to scan.
        bool deviceExists = await _dbContext
            .PrintServiceKey.Where(x => x.OutletId == outletId && x.DeviceId == req.DeviceId && x.RevokedAt == null)
            .AnyAsync(ct);
        if (!deviceExists)
        {
            await Send.OkAsync(false, ct);
            return;
        }

        // Action "nmap" tells the device to run a subnet scan using
        // IPAddress (single IP, wildcard, octet range or CIDR) and Port.
        PrintMessage printMessage = new()
        {
            PrinterName = "scan",
            IPAddress = req.IPAddress.Trim(),
            Port = req.Port,
            PrintInstructions = [],
            Action = "nmap",
        };

        await _printService.Print(outletId, req.DeviceId, printMessage);
        await Send.OkAsync(true, ct);
    }
}
