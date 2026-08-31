using Microsoft.AspNetCore.Authorization;
using Pos.Api.Data;
using Pos.Api.Services;

namespace Pos.Api.Features.Auth;

public class RoleTypeHandler : AuthorizationHandler<RoleTypeRequirement>
{
    private readonly UserService _user;

    public RoleTypeHandler(UserService user)
    {
        _user = user;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleTypeRequirement requirement)
    {
        var roles = await _user.GetUserRoles();
        if (roles.Count == 0)
            return;

        if (roles.Contains(requirement.RoleType))
        {
            context.Succeed(requirement);
        }
    }
}
