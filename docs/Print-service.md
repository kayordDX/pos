# Print-service.md — Go print service guide (SignalR client for Kayord POS)

**Audience:** an AI coding agent building the replacement print service in Go.

**Goal:** a small, single-binary Go service that runs on a Raspberry Pi (or any always-on box at a restaurant), connects **outbound** to the POS API's SignalR hub (`/printer-hub`) using an API key created by an outlet manager, receives print jobs, prints them to EPSON-compatible network thermal printers (raw TCP port 9100), performs network scans natively (no nmap), and reports printer reachability.

Companion doc: `docs/Print.md` (server side). Keep the wire contract in sync with it.

---

## 1. Ground rules

- **Outbound connections only.** The device dials the POS API over HTTPS/WSS. No inbound ports, no Redis, no VPN.
- **Stdlib first.** The only third-party dependency is the SignalR client (`github.com/philippseith/signalr`). No nmap, no ESC/POS library — the POS server pre-renders all ESC/POS byte instructions; the device is a TCP relay.
- **Config = environment variables.** No config files. Outlet and device identity come from the API key, not from config.
- Target platforms: `linux/arm` (Pi Zero 1, ARMv6), `linux/arm64` (Pi Zero 2 W, Pi 4/5), `linux/amd64`. Fully static binaries (`CGO_ENABLED=0`).

## 2. Project setup

```bash
mkdir print-service && cd print-service
go mod init github.com/kayorddx/print-service
go get github.com/philippseith/signalr
```

Layout:

```
main.go
internal/config/config.go        — env parsing
internal/model/model.go          — wire contract types
internal/hubclient/hubclient.go  — SignalR connection, receiver, reconnect
internal/printer/printer.go      — TCP print
internal/scan/scan.go            — native subnet scan (replaces nmap)
internal/probe/probe.go          — printer reachability probes
Dockerfile
Makefile
README.md
```

> **Library note:** pin the latest release of `philippseith/signalr` and check its exact option names on pkg.go.dev for that version — the options API has evolved between versions (e.g. `WithHTTPConnectionOptions`, `HTTPConnectionOptions.AccessToken`, `WithConnector`). The snippets below show intent; adapt names to the pinned version.

## 3. Configuration (`internal/config`)

| Env var | Required | Default | Meaning |
|---|---|---|---|
| `POS_BASE_URL` | yes | — | e.g. `https://api.kayord.com` (no trailing slash) |
| `POS_API_KEY` | yes | — | `kpos_{keyId}.{secret}` — created by an outlet manager in the POS admin UI |
| `LOG_LEVEL` | no | `info` | `debug\|info\|warn\|error` |
| `PROBE_INTERVAL_SECONDS` | no | `30` | printer reachability probe interval |

Outlet/device identity comes from the key server-side; **the device never configures them**.

## 4. Wire contract (`internal/model`)

SignalR JSON hub protocol uses **camelCase** property names, and .NET serializes `byte[]` as **base64 strings** — Go's `encoding/json` does the same for `[]byte`, so these types line up with the server's `PrintMessage` / `PrinterTarget`:

```go
package model

// Mirrors Pos.Api Features.Printer.PrintMessage.
// Action == "nmap" means: run a network scan (legacy value kept for wire compatibility — do NOT rename).
type PrintMessage struct {
	Action            string   `json:"action,omitempty"`
	PrinterName       string   `json:"printerName"`
	IPAddress         string   `json:"ipAddress"`   // single IP or pattern like "192.168.1.*" for scans
	Port              int      `json:"port"`
	PrintInstructions [][]byte `json:"printInstructions"` // raw ESC/POS bytes; empty for scans
}

// Mirrors Pos.Api PrinterHub.PrinterTarget (sent via SyncPrinters).
type PrinterTarget struct {
	PrinterId int    `json:"printerId"`
	Name      string `json:"name"`
	IPAddress string `json:"ipAddress"`
	Port      int    `json:"port"`
}
```

## 5. Hub client (`internal/hubclient`)

Connect to `POS_BASE_URL + "/printer-hub"`:

- **Auth:** pass the API key so it reaches the server as `Authorization: Bearer kpos_...` on negotiate + WebSocket upgrade (the server also accepts `access_token` query — header is preferred since we can set headers).
- **Receiver struct:** methods matching server→client invocations:

```go
type Receiver struct{ App *App }

// server -> device: print job or scan request
func (r *Receiver) ReceivePrint(msg model.PrintMessage) { r.App.Dispatch(msg) }
// server -> device: which printers this device is responsible for probing
func (r *Receiver) SyncPrinters(targets []model.PrinterTarget) { r.App.SetTargets(targets) }
```

- **Device → server** (fire-and-forget `client.Send` is fine):
  - `ReportScanStarted()` — immediately after receiving a scan job
  - `ReportScanResult(output string)` — text summary when the scan finishes
  - `ReportPrinterProbe(printerId int, reachable bool, latencyMs int64)`
- **Reconnect:** use the library's connector-factory option (`WithConnector`) returning a fresh connection, so its built-in exponential-backoff loop handles drops. Log every state change (`ClientConnecting` / `ClientConnected` / closed). The server re-joins this connection to its groups automatically on every (re)connect — there is **no** resubscribe logic to implement.
- On start, log the key id (the part before `.` — never log the secret).

## 6. Printing (`internal/printer`)

Raw TCP to the printer — the POS server already rendered the ESC/POS bytes:

```go
func Print(ctx context.Context, msg model.PrintMessage) error {
	d := net.Dialer{Timeout: 5 * time.Second}
	conn, err := d.DialContext(ctx, "tcp", net.JoinHostPort(msg.IPAddress, strconv.Itoa(msg.Port)))
	if err != nil {
		return fmt.Errorf("dial printer %s:%d: %w", msg.IPAddress, msg.Port, err)
	}
	defer conn.Close()
	_ = conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	for _, chunk := range msg.PrintInstructions {
		if _, err := conn.Write(chunk); err != nil {
			return fmt.Errorf("write to printer: %w", err)
		}
	}
	return nil
}
```

Log success/failure per job. No retries (the POS user can re-print); errors must never crash the process.

## 7. Native scan (`internal/scan`) — replaces nmap

Triggered when `msg.Action == "nmap"` (legacy value — **keep it**, the server may still be migrating). `msg.IPAddress` is either a single IP or a `192.168.1.*`-style pattern; `msg.Port` is the port to test (9100).

- Expand the pattern to a candidate IP list (pattern → `/24` or enumerate octet values; also accept CIDR for robustness).
- Concurrent TCP-connect check: `net.Dialer{Timeout: 300 * time.Millisecond}`, ~128 concurrent dials via a semaphore, cancelable via context.
- Flow: invoke `ReportScanStarted` → run scan → build a plain-text summary (host list with `ip:port open`, plus timing — keep it human-readable, the admin UI displays it verbatim) → invoke `ReportScanResult(output)`.
- This replaces the old nmap flow: no root required, no external binary.

## 8. Reachability probes (`internal/probe`)

- Maintains the target list from `SyncPrinters` (thread-safe swap).
- Every `PROBE_INTERVAL_SECONDS`, probe each target on a staggered schedule (spread printers across the interval; ~500ms dial timeout).
- Report each result via `ReportPrinterProbe(printerId, reachable, latencyMs)`.
- Skip probes while the hub is disconnected; drop stale targets the server no longer sends.

## 9. `main.go` wiring

- Parse config; build `App` (holds hub client handle, target store, worker pool of 1 for print jobs + goroutine per scan/probe).
- Start the SignalR client; dispatch `ReceivePrint` jobs: `Action == "nmap"` → scan, else → print.
- Handle `SIGINT`/`SIGTERM`: stop client gracefully, exit 0.

## 10. Build & deploy

**Makefile:**

```makefile
build-all:
	CGO_ENABLED=0 GOOS=linux GOARCH=arm   GOARM=6 go build -o dist/print-service-linux-armv6 .
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64        go build -o dist/print-service-linux-arm64 .
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64        go build -o dist/print-service-linux-amd64 .
```

**Dockerfile** (multi-arch, no base needed — static binary):

```dockerfile
FROM --platform=$BUILDPLATFORM golang:1.24 AS build
ARG TARGETOS TARGETARCH
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o /print-service .

FROM scratch
COPY --from=build /print-service /print-service
ENTRYPOINT ["/print-service"]
```

```bash
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v6 \
  -t ghcr.io/kayorddx/print-service:latest --push .
```

**systemd** (for Pis without Docker):

```ini
# /etc/systemd/system/print-service.service
[Unit]
Description=Kayord print service
After=network-online.target

[Service]
Environment=POS_BASE_URL=https://api.kayord.com
EnvironmentFile=-/etc/kayord/print-service.env   # POS_API_KEY lives here, chmod 600
ExecStart=/usr/local/bin/print-service
Restart=always
RestartSec=5
User=kayord

[Install]
WantedBy=multi-user.target
```

## 11. Local testing checklist

1. POS API running locally (`dotnet run --project Pos.Api` in the pos repo) + Postgres/Redis via `docker compose up -d`.
2. Create a key as a manager (admin UI or Swagger `POST /printerservicekey`).
3. Fake printer: `nc -lk 9100` in another terminal (or a 5-line Go TCP echo) — verify `ReceivePrint` bytes arrive; better, test against a real EPSON on the LAN.
4. Start the service: `POS_BASE_URL=http://localhost:5117 POS_API_KEY=kpos_... go run .`
5. Verify:
   - [ ] Server logs show the hub connection + `SyncPrinters` payload
   - [ ] POS admin printers page shows the device online **live** (badge flips without refresh)
   - [ ] `POST /printer/test` prints on the fake/real printer
   - [ ] `POST /printer/scan` → `ReportScanStarted`/`ReportScanResult` appear in the scan results UI (no nmap installed — proves the native scan path)
   - [ ] Probes reported; a printer with the cable pulled flips `PrinterReachable` to false within one interval
   - [ ] Kill the network for 30s → service reconnects by itself and prints still work
   - [ ] Revoked key (revoke in UI) → connection dropped and cannot re-establish

## 12. Acceptance criteria

- [ ] Static binaries build for `linux/armv6`, `linux/arm64`, `linux/amd64`; Docker image builds multi-arch from `scratch`
- [ ] Connects to `/printer-hub` with only `POS_BASE_URL` + `POS_API_KEY`; rejects nothing server-side without a valid key
- [ ] Prints raw instructions to TCP printers; scan requests answered natively (no nmap binary anywhere)
- [ ] `ReportPrinterProbe` flow works; probes auto-recover after reconnect
- [ ] Survives: network loss, API restart, invalid-key-at-startup (retries with backoff, logs clearly)
- [ ] No secrets in logs (key id only); no inbound listeners; single small binary

## 13. Out of scope (do not build now)

- ESC/POS `DLE EOT` status polling (paper-out etc.) — stretch goal, same socket
- USB/serial printer support (OS-specific device handling)
- Local job queue/persistence — print is fire-and-forget by design
- mTLS / cert pinning (revisit after launch if required)
