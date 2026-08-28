namespace Pos.Api.Services.Whatsapp;

public class SessionConnectRequest
{
    public List<string> Subscribe = new() { "Message" };
    public bool Immediate { get; set; } = true;
}
