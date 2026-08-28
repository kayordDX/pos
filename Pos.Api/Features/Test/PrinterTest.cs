using Pos.Api.Common.Printer.Emitters;
using Pos.Api.Data;
using Pos.Api.Features.Bill;
using Pos.Api.Features.Bill.EmailBill;
using Pos.Api.Features.Bill.PrintBill;

namespace Pos.Api.Features.Test;

public class PrinterTest : EndpointWithoutRequest<bool>
{
    private readonly AppDbContext _dbContext;

    public PrinterTest(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("/test/print");
    }

    private static readonly EPSON e = new();

    public override async Task HandleAsync(CancellationToken ct)
    {
        PdfRequest pdfRequest = await BillHelper.GetPdfRequestAsync(78369, _dbContext);
        var printInstructions = BillPrint.GetBillPrintInstructions(pdfRequest, 64);

        var flattenedList = printInstructions.SelectMany(bytes => bytes);
        var bytes = flattenedList.ToArray();

        await File.WriteAllBytesAsync("test.bin", bytes);

        await Send.OkAsync(true);
    }
}
