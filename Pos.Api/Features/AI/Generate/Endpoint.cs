using Microsoft.SemanticKernel.ChatCompletion;

namespace Pos.Api.Features.AI.Generate;

public class Endpoint : Endpoint<Request, string?>
{
    private readonly IChatCompletionService _chatCompletionService;

    public Endpoint(IChatCompletionService chatCompletionService)
    {
        _chatCompletionService = chatCompletionService;
    }

    public override void Configure()
    {
        Post("ai/generate");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var result = await _chatCompletionService.GetChatMessageContentAsync(req.Prompt, cancellationToken: ct);
        await Send.OkAsync(result.Content);
    }
}
