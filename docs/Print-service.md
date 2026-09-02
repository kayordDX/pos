# Print contract — device side (print-service, Go)

> Counterpart: `docs/Print.md` (Pos.Api server). Keep both in sync with
> print-service `internal/model`, `internal/hubclient` and
> `Pos.Api/Hubs/PrinterHub.cs`.

The device is a single static Go binary that connects **outbound** to
`{POS_BASE_URL}/printer-hub` (SignalR JSON hub protocol) with
`Authorization: Bearer kpos_{keyId}.{secret}` and reconnects forever with
exponential backoff. Method-name matching is case-insensitive.

## Server → device (receiver methods)

| Method | Payload | Device behaviour |
| ------ | ------- | ---------------- |
| `ReceivePrint` | `model.PrintMessage` | `action == "nmap"` → native subnet scan (async); anything else → per-printer print queue. **Unknown actions are printed, not ignored** — the server must not invent new action values |
| `SyncPrinters` | `[]model.PrinterTarget` | Replaces the probe set; each target is TCP-dialed every `PROBE_INTERVAL_SECONDS` |
| `RequestDeviceInfo` | — | Gathers platform/addresses/versions and replies via `ReportDeviceInfo` |
| `RequestProbe` | `printerId: int` | TCP-dials that single target immediately and replies via `ReportPrinterProbe` |

## Device → server (invocations)

| Method | Arguments | When |
| ------ | --------- | ---- |
| `ReportScanStarted` | — | Scan begun (server shows progress) |
| `ReportScanResult` | `output: string` | Scan finished; human-readable summary |
| `ReportPrinterProbe` | `printerId: int`, `reachable: bool`, `latencyMs: int64` | Every probe cycle per target, and immediately after a `RequestProbe` (which bypasses the device's failure threshold); ids outside the device's probe set are never reported |
| `ReportPrintResult` | `jobId: string`, `ok: bool`, `detail: string` | After each queued print — only when `jobId` is non-empty (legacy servers) |
| `ReportDeviceInfo` | `model.DeviceInfo` (object) | In answer to `RequestDeviceInfo` |

## Wire models (camelCase JSON; `[]byte` = base64 string)

```text
PrintMessage   { action?, printerName, ipAddress, port, printInstructions[][], jobId? }
PrinterTarget  { printerId, name, ipAddress, port }
DeviceInfo     { hostname, platform, osVersion?, goVersion?, appVersion?,
                 numCpu, uptimeSeconds, interfaces?[] { name, mac?, ipv4[], ipv6[] } }
```

- `action` is empty for print jobs; `"nmap"` (legacy name) requests a scan.
- `ipAddress` also carries the scan pattern (single IP, wildcard, octet range
  or CIDR) with `port`.
- `jobId` is echoed back verbatim via `ReportPrintResult`; empty on legacy
  servers, which simply skip reporting.

## Configuration

| Env var | Meaning |
| ------- | ------- |
| `POS_BASE_URL` | POS API base URL, no trailing slash |
| `POS_API_KEY` / `POS_API_KEYS` | `kpos_{keyId}.{secret}` — one app instance per key |
| `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` |
| `PROBE_INTERVAL_SECONDS` | Printer probe interval (default 30) |

## Multi-key behaviour

With `POS_API_KEYS` each key gets a fully independent app instance — its own
hub connection, probe store and print queue — so one box can serve several
outlets. Probe state is never shared between keys.
