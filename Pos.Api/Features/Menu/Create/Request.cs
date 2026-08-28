using FluentValidation;
using Pos.Api.Common.Enums;

namespace Pos.Api.Features.Menu.Create;

public class Request
{
    public int OutletId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Position { get; set; }
}
