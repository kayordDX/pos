using System.Collections.Concurrent;

namespace Pos.Api.Hubs;

public class PrinterConnectionTracker
{
    private readonly ConcurrentDictionary<(int OutletId, int DeviceId), int> _connections = new();

    public void Connected(int outletId, int deviceId)
    {
        _connections.AddOrUpdate((outletId, deviceId), 1, (_, count) => count + 1);
    }

    public void Disconnected(int outletId, int deviceId)
    {
        while (true)
        {
            if (!_connections.TryGetValue((outletId, deviceId), out int count))
            {
                return;
            }

            if (count <= 1)
            {
                if (_connections.TryRemove((outletId, deviceId), out _))
                {
                    return;
                }

                continue;
            }

            if (_connections.TryUpdate((outletId, deviceId), count - 1, count))
            {
                return;
            }
        }
    }

    public List<int> OnlineDevices(int outletId)
    {
        return _connections
            .Where(x => x.Key.OutletId == outletId && x.Value > 0)
            .Select(x => x.Key.DeviceId)
            .Distinct()
            .ToList();
    }

    public bool IsOnline(int outletId, int deviceId)
    {
        return _connections.TryGetValue((outletId, deviceId), out int count) && count > 0;
    }
}
