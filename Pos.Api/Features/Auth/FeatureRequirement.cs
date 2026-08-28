using Microsoft.AspNetCore.Authorization;

namespace Pos.Api.Features.Auth;

public class FeatureRequirement : IAuthorizationRequirement
{
    public FeatureRequirement(string feature) => Feature = feature;
    public string Feature { get; set; } = string.Empty;

}
