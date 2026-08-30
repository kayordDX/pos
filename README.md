# Kayord Point of Sale

The backend and front end for kayord point of sale

Backend for kayord pos

```bash
dotnet ef migrations add StockPeriodSnapshot --context AppDbContext --project src/Pos.Api --startup-project src/Pos.Api --output-dir Data/Migrations

dotnet ef migrations remove --context AppDbContext --project src/Pos.Api --startup-project src/Pos.Api

dotnet ef database update StockPeriodSnapshot --context AppDbContext --project src/Pos.Api --startup-project src/Pos.Api

dotnet ef database update --project src/Pos.Api --startup-project src/Pos.Api

dotnet run --project src/Pos.Api

# TickerQ Migration
dotnet ef migrations add TickerQUpdate --context TickerQDbContext --project src/Pos.Api --startup-project src/Pos.Api --output-dir Data/TickerQMigrations
```

## Postgres

```bash
docker compose up -d
```

## Tools

```bash
dotnet tool restore
```

## Secrets

```bash
dotnet user-secrets init --project src/Pos.Api
dotnet user-secrets set "Halo:MerchantId" "secret" --project src/Pos.Api
dotnet user-secrets set "Halo:XApiKey" "secret" --project src/Pos.Api
dotnet user-secrets set "Email:Host" "secret" --project src/Pos.Api
dotnet user-secrets set "Email:Email" "secret" --project src/Pos.Api
dotnet user-secrets set "Email:Password" "secret" --project src/Pos.Api
dotnet user-secrets set "Whatsapp:Host" "secret" --project src/Pos.Api
dotnet user-secrets set "Whatsapp:XApiKey" "secret" --project src/Pos.Api
dotnet user-secrets set "App:GeminiKey" "secret" --project src/Pos.Api
dotnet user-secrets list --project src/Pos.Api
```
