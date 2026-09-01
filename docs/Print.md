# Print contract — server side (Pos.Api)

> Counterpart: `docs/Print-service.md` (Go device). Keep both in sync with
> `Pos.Api/Hubs/PrinterHub.cs`, `Pos.Api/Features/Printer/PrintMessage.cs`,
> `Pos.Api/Features/Printer/DeviceInfoReport.cs`, `Pos.Api/Hubs/PrinterTarget.cs`
> and print-service `internal/model`.

## Endpoint & auth

| Concern   | Value |
| --------- | ----- |
| Hub URL   | `/printer-hub` (SignalR, JSON hub protocol) |
| Auth      | `Authorization: Bearer kpos_{keyId}.{secret}` (or `access_token` query param) via the `PrinterKey` scheme |
| Identity  | Claims `outlet_id`, `device_id`, `key_id` — derived from the key, never from the client |
| Groups    | `printer-outlet-{outletId}` and `printer-outlet-{outletId}-device-{deviceId}`, joined server-side in `OnConnectedAsync` |

Devices only ever connect outbound; no inbound ports. Users observe status on
the `/hub` (`KayordHub`) outlet group `outlet:{outletId}`.

## Server → device (client interface `IPrinterHub`)

| Method | Payload | Purpose |
| ------ | ------- | ------- |
| `ReceivePrint` | `PrintMessage` | Print job (`action` empty) or scan request (`action: "nmap"`) |
| `SyncPrinters` | `PrinterTarget[]` | The device's printer set; sent on connect and whenever assignments change |
| `RequestDeviceInfo` | — | Ask the device to collect hostname, platform, versions, network interfaces and report them back |

Note: the device treats any non-`nmap` action as a print job — do not invent
new action values; add an invocation instead.

## Device → server (hub methods)

| Method | Arguments | Server behaviour |
| ------ | --------- | ---------------- |
| `ReportScanStarted` | — | Sets `scan-status:{outletId}:{deviceId}` (5 min TTL) |
| `ReportScanResult` | `output: string` | Clears the status key, sets `scan-result:{outletId}:{deviceId}` (5 min TTL) |
| `ReportPrinterProbe` | `printerId: int`, `reachable: bool`, `latencyMs: long` | Validates the printer is assigned to the device, updates `PrinterProbeCache`, broadcasts `PrinterStatusChanged` on `KayordHub` |
| `ReportPrintResult` | `jobId: string`, `ok: bool`, `detail: string` | Stores `print-result:{outletId}:{deviceId}:{jobId}` (5 min TTL); readable via `GET /printer/print-result` |
| `ReportDeviceInfo` | `DeviceInfoReport` (object) | Serialized to JSON under `device-info:{outletId}:{deviceId}` (5 min TTL); readable via `GET /printer/device-info` |

## Wire models (camelCase on the wire; `byte[]` = base64 string)

```text
PrintMessage   { action?, printerName, ipAddress, port, printInstructions[], jobId? }
PrinterTarget  { printerId, name, ipAddress, port }
DeviceInfoReport { hostname, platform, osVersion?, goVersion?, appVersion?,
                   numCpu, uptimeSeconds, interfaces[] { name, mac?, ipv4[], ipv6[] } }
```

## Job lifecycle

1. `PrintService.Print` assigns `JobId` (GUID `N`) when empty — the same id is
   published to Redis and SignalR during the `Print:Transport: both` window,
   letting the device/server dedup double delivery.
2. Device prints and calls `ReportPrintResult(jobId, ok, detail)`; empty
   `jobId` (legacy server) means the device skips reporting.
3. Server caches the result for 5 minutes; UI polls
   `GET /printer/print-result?outletId&deviceId&jobId`.

## Scan / device-info flows

- Scan: `POST /printer/scan` → `ReceivePrint{action:"nmap", ipAddress, port}` →
  device reports `ReportScanStarted` / `ReportScanResult` → UI polls
  `GET /printer/scan`.
- Device info: `POST /printer/device-info` → `RequestDeviceInfo()` → device
  calls `ReportDeviceInfo` → UI polls `GET /printer/device-info`.

## Legacy Redis transport

`Print:Transport: redis | both | signalr` (default `redis`). Redis pub/sub
(`print:{outletId}:{deviceId}`) is the legacy print path only; probes, scan
reports, device info and print results exist solely on the hub.
