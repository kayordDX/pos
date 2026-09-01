namespace Integration.Printer;

[Collection(nameof(AppCollection))]
public class PrintResultTests(App app) : TestBase<App>
{
    [Fact]
    public async Task UnknownJobReturnsEmptyResultEchoingJobId()
    {
        var (rsp, res) = await app.ClientAuth.GETAsync<
            Pos.Api.Features.Printer.PrintResults.Endpoint,
            Pos.Api.Features.Printer.PrintResults.Request,
            Pos.Api.Features.Printer.PrintResult
        >(
            new()
            {
                OutletId = 1,
                DeviceId = 1,
                JobId = "nonexistent",
            }
        );

        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
        res.JobId.ShouldBe("nonexistent");
        res.Ok.ShouldBeFalse();
        res.Detail.ShouldBeEmpty();
    }
}
