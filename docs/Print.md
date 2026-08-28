# Print.md — Pos.Api + Client guide for print-over-SignalR

**Audience:** an AI coding agent working in this repo (`kayordDX/pos`). Follow the phases in order. Check off each verification step before moving on.

**Goal:** replace the Redis pub/sub print transport with SignalR, add outlet-manager-managed API keys that a (new, Go) print service uses to authenticate, and expose richer printer states in the admin UI. **The existing Redis path stays in place and functional until every printer box is migrated** (dual-transport via a config flag).

Background: `docs/print-service-signalr-migration.md` (architecture rationale). The device-side guide is `docs/Print-service.md` — keep the wire contract in sync with it.

---

## 0. Ground rules

- Do **not** modify `Pos.Api/Hubs/KayordHub.cs` auth (Firebase JWT) — device keys must never be able to reach user features.
- Do **not** remove any Redis code in this repo. Pos.Api still uses Redis for the SignalR backplane, auth OTP, and scan results during migration. Cleanup happens only in Phase 7.
- New API surface must be discoverable by Swagger (FastEndpoints auto-discovery handles this) so the client can regenerate its API layer.
- Default config must keep current behavior (`Print:Transport=redis`). Ops flips it per environment; no behavior change on merge.

## 1. Current state (read these first)

| Concern | File |
|---|---|
| Print send (Redis publish to `print:{outletId}:{deviceId}`) | `Pos.Api/Services/PrintService.cs` |
| User hub (Firebase JWT, `/hub`, Redis backplane) | `Pos.Api/Hubs/KayordHub.cs`, `Pos.Api/Hubs/UserProvider.cs`, `Pos.Api/Program.cs` |
| Auth registration (JWT bearer + `access_token` query for hubs) | `Pos.Api/Common/Extensions/AuthExtensions.cs` |
| Scan trigger (sends `PrintMessage` with `Action="nmap"`) | `Pos.Api/Features/Printer/Scan/Endpoint.cs` |
| Scan results (reads Redis keys `status-print:*` / `result-print:*`) | `Pos.Api/Features/Printer/ScanResults/Endpoint.cs` |
| Printer list + `IsConnected` via `PUBSUB NUMSUB` hack | `Pos.Api/Features/Printer/List/Endpoint.cs` |
| Printer entity (`OutletId`, `DeviceId`, `IPAddress`, `Port`) | `Pos.Api/Entities/Printer.cs` |
| Manager policy pattern | `Pos.Api/Features/MenuItem/Create/Endpoint.cs` (`Policies(Constants.Policy.Manager)`), `Pos.Api/Features/Auth/RoleTypeHandler.cs` |
| EF DbContext / entity config | `Pos.Api/Data/AppDbContext.cs`, `Pos.Api/Data/Configuration/` |
| Admin printers page | `client/src/routes/(pages)/manager/admin/+page.svelte`, dialogs in `client/src/routes/(pages)/manager/admin/printers/` |
| Hub store (frontend SignalR client) | `client/src/lib/stores/hub.svelte.ts` |
| API client regen | `client/package.json` script `api` (curl openapi → `orval`) |

```
today:  Pos.Api --publish--> Redis "print:{outletId}:{deviceId}" <---- .NET print-service (Pi)
        Pos.Api <--keys-- Redis "status-print:*" / "result-print:*" -- nmap scan results
        Pos.Api     PUBSUB NUMSUB  -> IsConnected guess
```

## 2. Target

```
Pos.Api (public HTTPS)
 ├─ /hub          KayordHub   — Firebase users (UNCHANGED)
 └─ /printer-hub  PrinterHub  — API-key auth (scheme "PrinterKey")
        ▲ outbound WSS only
        │
   Go print-service (Pi Zero) — see docs/Print-service.md
```

- Print jobs: server → `Clients.Group("printer-outlet-{outletId}-device-{deviceId}").ReceivePrint(msg)`
- Scan results: device → hub (`ReportScanStarted` / `ReportScanResult`) → `IMemoryCache` (replaces Redis keys)
- Printer reachability: device probes each printer (TCP dial) → `ReportPrinterProbe` → `PrinterProbeCache`
- Device online: hub `OnConnectedAsync`/`OnDisconnectedAsync` → `PrinterConnectionTracker` (replaces `PUBSUB NUMSUB`)

---

## 3. Phase 1 — `PrintServiceKey` entity + EF migration

Create `Pos.Api/Entities/PrintServiceKey.cs`:

```csharp
namespace Pos.Api.Entities;

public class PrintServiceKey : AuditableEntity
{
    public int Id { get; set; }
    public int OutletId { get; set; }
    public int DeviceId { get; set; } = 1;      // bound at creation; replaces per-Pi Config:DeviceId
    public string KeyId { get; set; } = string.Empty;   // public id, e.g. "pk_8f3a91c2"; unique, indexed
    public string SecretHash { get; set; } = string.Empty; // SHA-256 of secret (hex); secret itself never stored
    public string Name { get; set; } = string.Empty;       // human label, e.g. "Front-desk Pi"
    public DateTime? RevokedAt { get; set; }
    public DateTime? LastSeenAt { get; set; }
}
```

- Register `DbSet<PrintServiceKey>` in `Pos.Api/Data/AppDbContext.cs` and add an EF configuration in `Pos.Api/Data/Configuration/` (unique index on `KeyId`; follow `PrinterConfiguration.cs` pattern).
- Migration (run from repo root — note: README paths `src/Pos.Api` are stale):

```bash
dotnet ef migrations add AddPrintServiceKey --context AppDbContext --project Pos.Api --startup-project Pos.Api --output-dir Data/Migrations
dotnet ef database update --context AppDbContext --project Pos.Api --startup-project Pos.Api
```

**Verify:** migration applies cleanly against the dev DB (`docker compose up -d` first).

## 4. Phase 2 — Key management endpoints (outlet managers)

New feature folder `Pos.Api/Features/PrintServiceKey/` following the existing FastEndpoints layout (`Create/`, `List/`, `Revoke/`, each with `Endpoint.cs` + `Request.cs` + `Validator`). All three endpoints call `Policies(Constants.Policy.Manager);` in `Configure()`.

**Key format:** `kpos_{keyId}.{secret}`
- `keyId`: `"pk_"` + 8 hex chars (URL-safe, shown in lists)
- `secret`: 32 random bytes (`RandomNumberGenerator.GetBytes(32)`), base64url-encoded
- Store **only** `Convert.ToHexString(SHA256.HashData(secretBytes))` in `SecretHash`. The full key is returned **once** in the Create response and never again.

**Create** — `POST /printerservicekey`
- Request: `{ outletId, deviceId, name }` (validate against `Constants.Policy.Manager` role; also scope to the caller's outlet like `Printer/List` does via `r.OutletId` pattern — check how other endpoints obtain the current outlet and mirror it)
- Generates the key, saves the entity, responds with DTO including `fullKey` (plaintext, this response only)

**List** — `GET /printerservicekey` (by current outlet)
- Returns: `id, keyId, name, deviceId, maskedKey ("kpos_pk_8f3a…"), lastSeenAt, revokedAt, created`
- Follow the existing DTO + `ProjectToDto()` mapping pattern used by `PrinterDTO`.

**Revoke** — `POST /printerservicekey/revoke`
- Request: `{ id }`. Sets `RevokedAt = DateTime.UtcNow`. Must also evict the auth cache entry for that KeyId (Phase 3) so revocation is immediate.

**Verify:** endpoints appear in Swagger; a manager token can create/list/revoke; a non-manager gets 403.

## 5. Phase 3 — `PrinterKey` authentication handler

New file `Pos.Api/Features/Auth/PrinterKeyAuthenticationHandler.cs`:

- `AuthenticationHandler<AuthenticationSchemeOptions>`, scheme name constant `Constants.Policy.PrinterKeyScheme` (add constant, value `"PrinterKey"`).
- Token extraction, in order: `Authorization: Bearer <key>` header, then `Request.Query["access_token"]` (SignalR passes the query string through to the WebSocket; browsers can't set WS headers).
- Reject anything not starting with `"kpos_"` (return `AuthenticateResult.NoResult()` so other schemes are unaffected elsewhere).
- Split on `.` → `keyId` + `secret`. Look up `KeyId` in `DbContext.PrinterServiceKey`. Compare `SHA256(secret)` with stored hash using `CryptographicOperations.FixedTimeEquals`. Fail if `RevokedAt != null`.
- **Cache:** `IMemoryCache` entry `printerkey:{keyId}` → validated claims, 5-minute sliding expiry. On Revoke (Phase 2), `_memoryCache.Remove(...)`.
- Success → `ClaimsPrincipal` with a `ClaimsIdentity` containing claims: `outlet_id`, `device_id`, `key_id`. `DefaultAuthenticateScheme`/`DefaultChallengeScheme` wiring: register via `services.AddAuthentication("PrinterKey")...` **additively** — do NOT replace the existing Firebase JWT default. The Firebase scheme stays the default; this scheme is only selected explicitly (Phase 4).
- On successful authentication, update `LastSeenAt` on the key entity (fire-and-forget, throttle to once per minute per key).

Register the handler and `IMemoryCache` in `AuthExtensions.ConfigureAuth`.

**Verify:** unit-style check with curl — `curl -H "Authorization: Bearer kpos_..." /printerservicekey-test` style probe or temporary endpoint; revoked key fails immediately.

## 6. Phase 4 — `PrinterHub`

New files `Pos.Api/Hubs/PrinterHub.cs` (+ `IPrinterHub` client interface) and `Pos.Api/Hubs/PrinterConnectionTracker.cs`.

```csharp
public interface IPrinterHub                      // server -> device
{
    Task ReceivePrint(Features.Printer.PrintMessage message);
    Task SyncPrinters(List<PrinterTarget> printers);
}

public interface IPrinterHubServer                // device -> server (validate everything against claims!)
{
    Task ReportScanStarted();
    Task ReportScanResult(string output);
    Task ReportPrinterProbe(int printerId, bool reachable, long latencyMs);
}
```

`PrinterTarget` (wire contract — must match `docs/Print-service.md`):

```csharp
public class PrinterTarget { public int PrinterId; public string Name; public string IPAddress; public int Port; }
```

Hub behavior:
- `OnConnectedAsync`: read `outlet_id`, `device_id`, `key_id` claims → join groups `printer-outlet-{outletId}` and `printer-outlet-{outletId}-device-{deviceId}` (**server-side only — never accept a client-called JoinGroup**). Increment `PrinterConnectionTracker`, broadcast device-online to `KayordHub` group `outlet-{outletId}` (existing outlet group naming — check `RefreshOutlet` usage for the convention), and send `SyncPrinters(...)` with the device's printers from the DB.
- `OnDisconnectedAsync`: decrement tracker, broadcast device-offline.
- `ReportScanStarted` / `ReportScanResult`: derive outlet/device **from claims** (never trust parameters), write `IMemoryCache` keys `scan-status:{outletId}:{deviceId}` and `scan-result:{outletId}:{deviceId}` with 5-minute expiry (mirrors old Redis TTL).
- `ReportPrinterProbe`: verify `printerId` belongs to the calling device's outlet+deviceId (cache the `SyncPrinters` set per device to avoid DB hits), then store in `PrinterProbeCache` (singleton, `printerId` → result + timestamp) and broadcast `PrinterStatusChanged(outletId, printerId, reachable)` on `KayordHub` so the admin UI updates live.

New singletons (DI in a new `Common/Extensions/PrinterHubExtensions.cs` or inside `ConfigurePrint`):
- `PrinterConnectionTracker` — `ConcurrentDictionary<(int outletId, int deviceId), int>`; methods `Connected/Disconnected/OnlineDevices(outletId)/IsOnline(outletId, deviceId)`.
- `PrinterProbeCache` — `ConcurrentDictionary<int, (bool reachable, long latencyMs, DateTime updatedAt)>`; treat entries older than 10 minutes as unknown (mirrors old `PrinterStatus.IsOutdated`).

`Program.cs`:

```csharp
app.MapHub<PrinterHub>("/printer-hub")
   .RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = "PrinterKey" });
```

**Verify:** with any WS client, connect with a valid key → connection sticks; connect with a garbage/revoked key → 401.

## 7. Phase 5 — Send-side switch (dual transport, flag-guarded)

**`Pos.Api/Services/PrintService.cs`** — inject `IHubContext<PrinterHub, IPrinterHub>` + `IConfiguration`. Keep the existing Redis publish exactly as-is:

```csharp
public async Task Print(int outletId, int deviceId, PrintMessage msg)
{
    var transport = _config.GetValue<string>("Print:Transport") ?? "redis"; // redis | both | signalr
    if (transport is "redis" or "both")
    {
        /* existing Redis publish — unchanged */
    }
    if (transport is "signalr" or "both")
    {
        await _hub.Clients.Group($"printer-outlet-{outletId}-device-{deviceId}").ReceivePrint(msg);
    }
}
```

**`Pos.Api/Features/Printer/ScanResults/Endpoint.cs`** — read `IMemoryCache` scan entries first; **fall back** to the old Redis keys while legacy devices are still in play. Delete the Redis fallback only in Phase 7.

**`Pos.Api/Features/Printer/List/Endpoint.cs`** — extend the DTO (`PrinterDTO` + mapping) with:
- `DeviceOnline: bool` ← `PrinterConnectionTracker.IsOnline(outletId, deviceId)`
- `PrinterReachable: bool?` ← `PrinterProbeCache` (null = never probed / stale)
- Keep the existing `IsConnected` field populated as today (Redis `PUBSUB` path) until Phase 7; new UI should prefer `DeviceOnline`/`PrinterReachable`.

**Config:** add `Print:Transport` to `appsettings.json` with value `"redis"` (default, zero behavior change). Document `Print__Transport` env override for deployments.

**Verify:** `dotnet build` warning-free; with flag `redis`, existing print flow works exactly as before (regression test: `/bill/print`, `/printer/test`, `/printer/scan`).

## 8. Phase 6 — Client (Svelte)

1. **Regenerate API client:** run the API locally (`dotnet run --project Pos.Api`, port 5117), then in `client/`: `pnpm run api`. Confirm new `printerservicekey` tag functions appear in `client/src/lib/api/generated/`.
2. **API keys UI** (follow the dialog patterns in `AddPrinter.svelte` / `DeletePrinter.svelte`, `@kayord/ui` components, `sonner` toasts):
   - `client/src/routes/(pages)/manager/admin/printers/PrintKeys.svelte` — key list: masked key, name, device, last-seen, revoked badge, revoke button (confirm dialog).
   - `client/src/routes/(pages)/manager/admin/printers/AddPrintKey.svelte` — create dialog: outlet (default current), deviceId (number, default 1), name. On success show the **full key once** with copy-to-clipboard and a "you will not see this again" warning.
   - Mount both on the admin printers page (`admin/+page.svelte`), e.g. a "Print devices / keys" section; if a separate route is preferred, also add an entry to `AdminSidebar.svelte` following its existing pattern.
3. **Printer card states** (`client/src/lib/components/Printer.svelte`): show two distinct badges — `DeviceOnline` (box reachable via hub) and `PrinterReachable` (printer answers on its port; `unknown` when null). Keep `isConnected` rendering for legacy fallback.
4. **Live updates:** in the printers page, subscribe via `hub.svelte.ts`: `hub.on("PrinterStatusChanged", ...)` (payload `{ outletId, printerId, reachable, online }`) and update the list state without refetch; also handle device online/offline broadcast. Unsubscribe on destroy.
5. Type the payloads locally (hand-written types are fine for hub events; orval only covers REST).

**Verify:** create key in UI → full key shown once → appears masked in list; revoking removes it; badges render; a real (or fake, see Print-service.md) device flips badges live without refresh.

## 9. Phase 7 — Cutover & cleanup (only after ALL printer boxes run the Go service)

Sequence (ops + code):
1. Deploy release with `Print:Transport=redis` (safe, nothing uses hub yet).
2. Per box: create key in admin UI → stop old .NET service → start Go print-service with that key (see `docs/Print-service.md`). **One device per outlet+deviceId pair** — never run old and new service for the same pair simultaneously (double prints under `both`).
3. When the last box is migrated: set `Print__Transport=both`, verify prints + scans on every box, then set `Print__Transport=signalr`.
4. Final cleanup PR (only after `signalr` is stable everywhere):
   - Delete Redis publish from `PrintService.cs`, the `PUBSUB NUMSUB` block and `IsConnected` fallback in `Printer/List`, Redis fallback in `ScanResults`.
   - Delete old scan UI remnants if any; drop Redis `status-*`/`result-*` conventions from docs.
   - Keep: Redis **backplane** (`AddStackExchangeRedis`), `RedisClient` (OTP/auth caching), `compose.yml` Redis.

Rollback at any point before step 4: flip `Print__Transport` back to `redis`.

---

## 10. Acceptance criteria

- [ ] Migration `AddPrintServiceKey` applies and reverts cleanly
- [ ] Manager can create/list/revoke keys via UI; full key shown exactly once; non-managers get 403
- [ ] Revoked key rejected immediately on new hub connections
- [ ] `/printer-hub` requires `PrinterKey` scheme; `/hub` auth unchanged (Firebase still works)
- [ ] With `Print:Transport=redis`: zero behavior change (print, test, scan all work via Redis)
- [ ] With `Print:Transport=both` or `signalr` + a connected Go device: prints, scans (native, `Action="nmap"` kept for wire compat), and probes work end-to-end
- [ ] Scan results readable via `ScanResults` endpoint (memory cache, Redis fallback during migration)
- [ ] Printer list shows `DeviceOnline` + `PrinterReachable`; badges update live via `PrinterStatusChanged`
- [ ] `dotnet build` / `svelte-check` clean; client regenerated from Swagger

## 11. Out of scope (do not build now)

- ESC/POS `DLE EOT` paper/error status (stretch goal, device-side)
- Key rotation endpoint (revoke + create is sufficient)
- TickerQ job for pruning stale keys
- Deleting the legacy .NET print-service repo
