using Pos.Api.Common.Printer.Emitters.BaseCommandValues;

namespace Pos.Api.Common.Printer.Emitters;

public abstract partial class BaseCommandEmitter : ICommandEmitter
{
    /* Display Commands */
    public virtual byte[] Clear() => new byte[] { Display.CLR };
}
