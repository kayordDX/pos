namespace Integration.Status;

[Collection(nameof(AppCollection))]
public class StatusTests(App app) : TestBase<App>
{
    [Fact]
    public async Task TestGetStatus()
    {
        var (rsp, res) = await app.ClientAuth.GETAsync<Pos.Api.Features.User.GetStatus.Endpoint, Pos.Api.Features.User.GetStatus.Response>();

        rsp.StatusCode.ShouldBe(HttpStatusCode.OK);
    }
}
