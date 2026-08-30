using Pos.Api.DTO;

namespace Pos.Api.Features.Menu.GetSections;

public class Response
{
    public List<MenuSectionDTO>? Sections { get; set; }
    public List<MenuSectionDTO>? Parents { get; set; }
}
