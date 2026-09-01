using System.Net;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Pos.Api.Events;
using Shouldly;

namespace Integration.Hub;

[Collection(nameof(HubCollection))]
public class HubTests(HubApp app) : TestBase<HubApp>
{
    [Fact]
    public async Task Anonymous_Negotiate_Is_Allowed()
    {
        // Regression: the device-link (OTP) flow connects to /hub before login,
        // so the endpoint must accept anonymous connections. A class-level
        // [Authorize] (or RequireAuthorization on the endpoint) used to block
        // this negotiate request entirely.
        var uri = new Uri(app.Client.BaseAddress!, "hub/negotiate?negotiateVersion=1");
        var response = await app.Client.PostAsync(uri, new StringContent(""), TestContext.Current.CancellationToken);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Anonymous_Connection_Can_Request_OTP_But_Not_Join_Groups()
    {
        var otpReceived = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);

        var connection = new HubConnectionBuilder()
            .WithUrl(
                new Uri(app.Client.BaseAddress!, "hub"),
                options =>
                {
                    // TestServer has no WebSocket transport — use SSE/LongPolling through its handler
                    options.HttpMessageHandlerFactory = _ => app.Server.CreateHandler();
                    options.Transports = HttpTransportType.ServerSentEvents | HttpTransportType.LongPolling;
                }
            )
            .Build();

        connection.On<DeviceAuthEvent>("DeviceAuth", e => otpReceived.TrySetResult(e.OTP));

        try
        {
            await connection.StartAsync(TestContext.Current.CancellationToken);

            // unauthenticated devices can request an OTP
            await connection.InvokeAsync("GetToken", TestContext.Current.CancellationToken);
            var otp = await otpReceived.Task.WaitAsync(TimeSpan.FromSeconds(30), TestContext.Current.CancellationToken);
            otp.ShouldNotBeNullOrEmpty();
            otp.Length.ShouldBe(6);

            // ...but must not be able to join groups (requires an authenticated user)
            var ex = await Should.ThrowAsync<HubException>(() => connection.InvokeAsync("JoinGroup", "outlet:1", TestContext.Current.CancellationToken));
            ex.Message.ShouldContain("unauthorized");
        }
        finally
        {
            await connection.DisposeAsync();
        }
    }
}
