using Pos.Api.Common.Printer.Emitters.BaseCommandValues;

namespace Pos.Api.Common.Printer.Emitters;

public abstract partial class BaseCommandEmitter : ICommandEmitter
{
    public virtual byte[] ResetLineSpacing() => new byte[] { Cmd.ESC, Whitespace.ResetLineSpacing };

    public virtual byte[] SetLineSpacingInDots(int dots) => new byte[] { Cmd.ESC, Whitespace.LineSpacingInDots, (byte)dots };
}
