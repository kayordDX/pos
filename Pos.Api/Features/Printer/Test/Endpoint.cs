using Microsoft.EntityFrameworkCore;
using Pos.Api.Common.Printer.Emitters;
using Pos.Api.Common.Printer.Emitters.Enums;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Printer.Test;

public class Endpoint(AppDbContext dbContext, PrintService printService) : Endpoint<Request, bool>
{
    private readonly AppDbContext _dbContext = dbContext;
    private readonly PrintService _printService = printService;

    public override void Configure()
    {
        Post("/printer/test");
    }

    private static readonly EPSON e = new();

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        List<byte[]> instructions =
        [
            e.SetStyles(PrintStyle.None),
            e.Print("Default: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.FontB),
            e.Print("Font B: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.Bold),
            e.Print("Bold: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.Underline),
            e.Print("Underline: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.DoubleWidth),
            e.Print("DoubleWidth: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.DoubleHeight),
            e.Print("DoubleHeight: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.FontB | PrintStyle.DoubleHeight | PrintStyle.DoubleWidth | PrintStyle.Underline | PrintStyle.Bold),
            e.Print("All Styles: The quick brown fox jumped over the lazy dogs.\n"),
            e.SetStyles(PrintStyle.None),
            e.ReverseMode(true),
            e.PrintLine("REVERSE MODE: The quick brown fox jumped over the lazy dogs."),
            e.SetStyles(PrintStyle.FontB | PrintStyle.DoubleHeight | PrintStyle.DoubleWidth),
            e.PrintLine("REVERSE MODE: The quick brown fox jumped over the lazy dogs."),
            e.SetStyles(PrintStyle.None),
            e.ReverseMode(false),
            e.SetStyles(PrintStyle.None),
            e.RightCharacterSpacing(5),
            e.PrintLine("Right space 5: The quick brown fox jumped over the lazy dogs."),
            e.RightCharacterSpacing(0),
            e.SetStyles(PrintStyle.None),
            e.UpsideDownMode(true),
            e.PrintLine("Upside Down Mode: The quick brown fox jumped over the lazy dogs."),
            e.UpsideDownMode(false),
        ];

        var printer = await _dbContext.Printer.Where(x => x.Id == req.PrinterId).AsNoTracking().FirstOrDefaultAsync(ct);
        if (printer == null)
        {
            await Send.OkAsync(false, ct);
            return;
        }

        PrintMessage printMessage = new()
        {
            PrinterName = printer.PrinterName,
            IPAddress = printer.IPAddress,
            Port = printer.Port,
            PrintInstructions = instructions,
        };

        await _printService.Print(printer.OutletId, printer.DeviceId, printMessage);
        await Send.OkAsync(true, ct);
    }
}
