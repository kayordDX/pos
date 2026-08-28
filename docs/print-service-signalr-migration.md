# Print Service: Redis Pub/Sub → SignalR Migration Plan

> **Superseded as an implementation guide** by `docs/Print.md` (server side) and `docs/Print-service.md` (Go client). This document is kept as architecture background and rationale.

## Current state

```
Pos.Api ──publish──> Redis channel "print:{outletId}:{deviceId}" <──subscribe── print-service (Pi Zero, on LAN)
                        │
                        └── keys "status-print:…"/"result-print:…" (nmap scan results)
                        └── PUBSUB CHANNELS/NUMSUB (device online status)
```

| Concern | Today | Where |
|---|---|---|
| Send print job | `PrintService.Print()` publishes JSON to Redis | `Pos.Api/Services/PrintService.cs` |
| Receive print job | `Subscriber : BackgroundService` subscribes per configured outlet + static `Config:DeviceId` | `print-service/Services/Subscriber.cs` |
| Print | ESCPOS_NET → network printer (unchanged) | `print-service/Utils/Printer.cs` |
| nmap scan | `Action == "nmap"` → runs nmap, writes `result-*`/`status-*` Redis keys with 5-min TTL | `print-service/Utils/Nmap.cs` |
| Read scan results | API reads those Redis keys | `Pos.Api/Features/Printer/ScanResults/Endpoint.cs` |
| Device online? | `PUBSUB NUMSUB` count > 0 | `Pos.Api/Features/Printer/List/Endpoint.cs` |
| Hub (users) | `KayordHub` at `/hub`, Firebase JWT auth, Redis backplane | `Pos.Api/Hubs/KayordHub.cs` |

**Pain points:** print-service needs network access to Redis (can't work off-site / behind NAT unless Redis is exposed — bad), static outlet/device config per Pi, no real auth, fragile online detection via pub/sub introspection.

## Target architecture

```
Pos.Api (public HTTPS)
 ├── /hub            KayordHub    — Firebase users (unchanged, Redis backplane kept for scale-out)
 └── /printer-hub    PrinterHub   — API-key auth, device identity from key claims
                          ▲
                          │  outbound WSS only (works behind NAT / off-site)
 print-service (Pi Zero) ─┘
   config shrinks to: Pos:BaseUrl + Pos:ApiKey
```

- Print jobs: server → `Clients.Group(...)` → `ReceivePrint(PrintMessage)`
- Scan results: device → server (`ReportScanStarted` / `ReportScanResult`) → stored in `IMemoryCache` (mirrors today's 5-min Redis TTL) and/or pushed to the outlet's `KayordHub` group
- Online status: `OnConnectedAsync`/`OnDisconnectedAsync` — the server *knows* which device connections exist; no more `PUBSUB NUMSUB`
- Redis **backplane** for SignalR scale-out stays; the print pub/sub usage of Redis goes away (Pos.Api still uses Redis for OTP/auth caching — that stays)

## 1. API keys (outlet manager creates, print-service authenticates)

New entity `PrintServiceKey` (EF migration in `Pos.Api/Data/Migrations`):

```csharp
public class PrintServiceKey : AuditableEntity
{
    public int Id { get; set; }
    public int OutletId { get; set; }
    public int DeviceId { get; set; } = 1;          // bound at creation; replaces Config:DeviceId
    public string KeyId { get; set; }               // public id, e.g. "pk_8f3a…" (plaintext, indexed, unique)
    public string SecretHash { get; set; }          // SHA-256 of secret — sufficient for high-entropy random secrets
    public string Name { get; set; }                // "Front-desk Pi", "Bar printer box"
    public DateTime? RevokedAt { get; set; }
    public DateTime? LastSeenAt { get; set; }
}
```

- **Format:** `kpos_{keyId}.{secret}` — keyId visible for management, secret random 32 bytes base64url. **Shown once** at creation.
- **Endpoints** (new `Pos.Api/Features/PrintServiceKey/`): `Create`, `List` (masked `kpos_pk_8f3a…`, shows LastSeenAt/RevokedAt), `Revoke`. Authorized to outlet managers via the existing role checks pattern (`User/AssignOutlet`, `RoleHelper` style — same outlet scoping as `Printer/List`).
- **Hub auth:** new `PrinterKeyAuthenticationHandler` (`AuthenticationScheme: "PrinterKey"`). Token comes from `access_token` query param or `Authorization: Bearer` (SignalR JS/.NET clients support both). Handler: parse prefix → hash secret → lookup `KeyId` → check `RevokedAt == null` → build `ClaimsPrincipal` with claims `outlet_id`, `device_id`, `key_id`. Cache key→claims in `IMemoryCache` ~5 min (revoke clears the cache entry; worst case a revoked key lives ≤5 min).
- `Pos:BaseUrl` must be the public HTTPS URL; Firebase JWT path on `/hub` is untouched.

## 2. Server: `PrinterHub`

New `Pos.Api/Hubs/PrinterHub.cs` (+ `IPrinterHub` client interface), mapped with `.RequireAuthorization(policy → schemes: "PrinterKey")`:

```csharp
public interface IPrinterHub
{
    Task ReceivePrint(PrintMessage message);     // replaces Redis pub/sub delivery
}

public interface IPrinterHubServer   // client → server
{
    Task ReportScanStarted();                    // replaces "status-print:*" key
    Task ReportScanResult(string output);        // replaces "result-print:*" key
}
```

- **Groups joined server-side** in `OnConnectedAsync` from claims (never client-called `JoinGroup` — prevents privilege escalation): `printer-outlet-{outletId}` and `printer-outlet-{outletId}-device-{deviceId}`. Groups are per-connection, so reconnects re-join automatically.
- `OnConnectedAsync` / `OnDisconnectedAsync`: bump `LastSeenAt` on the key, broadcast device online/offline to the outlet's `KayordHub` group (live status in admin UI).
- `ReportScanStarted` → set `IMemoryCache["scan-status:{outletId}:{deviceId}"]` (5-min expiry); `ReportScanResult` → set `IMemoryCache["scan-result:{outletId}:{deviceId}"]`.
- **Connection registry:** a singleton `PrinterConnectionTracker` (thread-safe dict deviceId → count of open connections per outlet) replaces the `PUBSUB NUMSUB` logic in `Printer/List` — `IsConnected` becomes a simple lookup.

### Per-printer reachability probes (new capability)

Today `IsConnected` only proves the print-service *device* is subscribed — a physically unplugged printer still shows green. The device's TCP-dial capability enables true per-printer status:

1. Server → device on connect: `SyncPrinters([{ printerId, ip, port }, ...])` from the DB, scoped by the key's claims.
2. Device probes each target on a staggered interval (30–60s): one `net.DialTimeout(ip, port, 500ms)` per printer; reports `ReportPrinterProbe(printerId, reachable, latencyMs)`.
3. Server stores results in a `PrinterProbeCache` (printerId → result + timestamp; treat >10 min as outdated, matching old `PrinterStatus.IsOutdated`) and broadcasts `PrinterStatusChanged(outletId, printerId, reachable)` on `KayordHub`.
4. `Printer/List` exposes `DeviceOnline` (tracker) + `PrinterReachable` (probe cache); the Svelte printers page subscribes via the existing `hub.svelte.ts` store for live badge updates.
5. On-demand probe ("check" button) invokes an immediate dial instead of waiting for the interval — replaces the nmap round trip.

Stretch: ESC/POS real-time status (`DLE EOT`) over the same raw socket for paper-out/error states — pure Go, no library. Not required for parity.

## 3. Server: replace send-side

- `Pos.Api/Services/PrintService.cs`: inject `IHubContext<PrinterHub, IPrinterHub>`; `Print()` becomes `Clients.Group($"printer-outlet-{outletId}-device-{deviceId}").ReceivePrint(msg)`.
- **Dual-publish transition:** config flag `Print:Transport: redis | both | signalr` — publish to Redis *and* SignalR while Pis are being rolled out.
- `Printer/ScanResults/Endpoint.cs`: read from `IMemoryCache` instead of Redis keys (same DTO, same 5-min semantics).
- `Printer/List/Endpoint.cs`: delete the `PUBSUB` block, use `PrinterConnectionTracker`.
- Keep `PrintMessage` DTO shape; duplicate it in print-service (as today) or later extract a tiny shared contracts project.

## 4. Print-service changes

- Add `Microsoft.AspNetCore.SignalR.Client`; drop `StackExchange.Redis` (+ `RedisClient`, `RedisExtensions`, `Worker`).
- `Config` becomes: `BaseUrl` + `ApiKey`. `OutletIds`/`DeviceId` disappear — identity comes from the key.
- New `PosConnection : BackgroundService` replaces `Subscriber`:
  - `HubConnectionBuilder.WithAutomaticReconnect()` + outer restart loop for initial-connect failures (Pi Zero networks are flaky; today's `_failureCount` watchdog becomes unnecessary — SignalR handles keep-alive/reconnect).
  - Register `ReceivePrint` handler → same dispatch as today (`Action == "nmap"` → `NMap.Scan`, else `Printer.Print`).
  - `NMap.Scan` reports via `connection.InvokeAsync("ReportScanStarted")` / `"ReportScanResult"` instead of writing Redis keys; accepts the outlet/device ids from claims-free local context (or echo them in the hub call).
  - On `Closed`/`Reconnected` events: log + update state; server re-adds groups on every (re)connect, so no resubscribe logic needed.
- `Program.cs`: swap hosted services, remove `ConfigureRedis`.
- README/secrets: `dotnet user-secrets set "Pos:ApiKey" "kpos_…"`; compose sample drops the Redis connection string.

## 5. Client (Svelte) changes

- Admin → Printers: new "Print devices / keys" panel:
  - Create key dialog (choose outlet, device id, name) → **show full key once** with copy button + warning.
  - Key list: masked key, name, device, last seen, revoked badge; revoke action.
  - Device online badge now driven by hub event (subscribe via existing `stores/hub.svelte.ts` `RefreshOutlet`/device-status event) instead of page-load-only `isConnected`.
- Regenerate orval client (`client/orval.config.ts`) for the new `PrintServiceKey` endpoints.

## Phases

| Phase | Scope | Deployable? |
|---|---|---|
| **1. Keys + hub** | `PrintServiceKey` entity+migration, CRUD endpoints, `PrinterKeyAuthenticationHandler`, `PrinterHub`, connection tracker | Yes — additive, nothing uses it yet |
| **2. Client UI** | Key management + device status panel, regenerated API client | Yes |
| **3. print-service v2** | SignalR client, config change, Redis removal | Ships to Pis; talks to Phase 1 API |
| **4. Cutover** | API flag `both` → upgrade Pis → flag `signalr` → **5. Cleanup** | |
| **5. Cleanup** | Delete Redis publish path, `PUBSUB` status logic, Redis keys contract; delete print-service Redis packages | Final |

Rollback: flip `Print:Transport` back to `redis` while old print-service images are still running (keep the Redis path until every Pi is upgraded).

## Cross-platform & deployment (Go option)

Nothing in the hub/API design is platform-specific: SignalR is HTTP/WebSockets + a documented JSON protocol, device identity is the API key (outlet + device), never the host. The only host-specific concerns are the nmap binary and how the service is launched.

**Build matrix** — one codebase, static binaries (`CGO_ENABLED=0`):

| Target | Flags | Notes |
|---|---|---|
| Pi Zero 1 (W) | `GOOS=linux GOARCH=arm GOARM=6` | ARMv6 — .NET cannot target this at all |
| Pi Zero 2 W / Pi 4/5 / ARM servers | `GOOS=linux GOARCH=arm64` | |
| x86 servers / Docker | `GOOS=linux GOARCH=amd64` | |
| Windows box (if ever) | `GOOS=windows GOARCH=amd64` | run as service via `x/sys/windows/svc` |

Deploy as multi-arch Docker (`docker buildx --platform linux/amd64,linux/arm64,linux/arm/v6`, one `latest` tag, device pulls the right image) or bare systemd (`Restart=always`) on Pi OS.

**Printer path** is pure TCP to raw port 9100 (JetDirect) — no CUPS/spooler/driver on any OS. The one future boundary: USB/serial printers would introduce OS-specific device handling (out of scope).

**Drop nmap** (recommended if Go): replace with a native Go TCP-connect scan (`net.Dialer` + goroutines over the subnet, 300ms timeout). Faster for "which IPs have 9100 open", needs no root (unlike nmap SYN scans), and removes the only external binary → `FROM scratch` images. Trade-off: `PrinterScan.svelte` shows raw nmap output today; switch to a structured typed result.

**Wire-level concerns (protocol, not OS):** JSON hub protocol camelCase ↔ Go struct tags; .NET `byte[]` ↔ base64 ↔ Go `[]byte` (natively compatible). Verify once against the live hub in an integration test.

**Staying on .NET instead:** cross-platform via self-contained RIDs (`linux-arm64`, `win-x64`); fine on Pi Zero 2 W+, x86, Windows — but no ARMv6 support and ~70–100MB on disk / RSS on 512MB devices.

## Security checklist

- Secret stored **hashed only**; plaintext shown once; high-entropy random (≥128 bits).
- Key binds outlet + device; group membership derived **only** from validated claims server-side.
- Separate hub + scheme so device keys can never hit user-only `KayordHub` features.
- TLS enforced in production (public endpoint); hub auth also accepts header bearer for non-browser clients.
- Revocation is immediate for new connections; ≤5 min for cached validations (acceptable for printer hardware; can be made immediate by clearing the cache entry on revoke).
- `LastSeenAt` enables auditing/stale-key cleanup job later (optional TickerQ task).
- nmap action: keep it restricted — server only sends `Action: "nmap"` from the authenticated `/printer/scan` endpoint; device should ignore unknown actions (already the case).
