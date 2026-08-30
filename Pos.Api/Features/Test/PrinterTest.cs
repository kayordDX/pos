using Pos.Api.Common.Printer.Emitters;
using Pos.Api.Data;
using Pos.Api.Features.Bill;
using Pos.Api.Features.Bill.EmailBill;
using Pos.Api.Features.Bill.PrintBill;

namespace Pos.Api.Features.Test;

public class PrinterTest(AppDbContext dbContext) : EndpointWithoutRequest<bool>
{
    private readonly AppDbContext _dbContext = dbContext;

    public override void Configure()
    {
        Get("/test/print");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        PdfRequest pdfRequest = await BillHelper.GetPdfRequestAsync(78369, _dbContext);
        var printInstructions = BillPrint.GetBillPrintInstructions(pdfRequest, 64);

        var flattenedList = printInstructions.SelectMany(bytes => bytes);
        var bytes = flattenedList.ToArray();

        await File.WriteAllBytesAsync("test.bin", bytes, ct);

        await Send.OkAsync(true, ct);
    }
}
