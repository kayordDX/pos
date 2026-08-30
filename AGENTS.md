# AGENTS.md - Coding Agent Instructions

## Project Overview

Aspire orchestrated monorepo: for pos system.

| Directory              | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `Pos.AppHost/`         | Aspire AppHost — orchestrates API, frontend, Postgres, Redis     |
| `Pos.Api/`             | .NET 10 FastEndpoints backend                                    |
| `Pos.ServiceDefaults/` | Aspire service defaults (OTel, health checks, service discovery) |
| `Pos.Tests/`           | Integration and unit tests                                       |
| `client/`              | SvelteKit 5 frontend (`client/src/`)                             |

## Available Skills

Always invoke the relevant skill before working in that area.

| Skill                       | When to use                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| `ui`                        | `@kayord/ui` / shadcn-svelte components, forms, dialogs, dropdowns           |
| `svelte-core-bestpractices` | Svelte 5 patterns, reactivity, composition, styling, performance             |
| `svelte-code-writer`        | Any `.svelte`, `.svelte.ts`, or `.svelte.js` file — lookup and code analysis |

## Environment

- First run: `pnpm install` in `client/` — fresh worktrees/checkouts have no `node_modules`; install before `pnpm check`/lint or before verifying package exports. `pnpm check` passing also confirms named imports from `@kayord/ui`/`@lucide/svelte` exist (no need to inspect the package manually)
- `pnpm api` and integration tests (Testcontainers) require Docker + running stack
- Without Docker/stack: integration tests compile only; hand-edit generated client to match orval output (note this in the PR)

## General Guidelines

- Do not add comments to explain everything. Add comments only where it will add real value.

## Quality Gates (mandatory — run after every change)

### Frontend

```sh
pnpm check   # type-check
pnpm lint    # lint
pnpm format  # format
```

### Backend

```sh
dotnet build        # build
csharpier check .   # check formatting
csharpier format .  # fix formatting if needed
```

## Tests

When any bigger code changes were made make sure to run the tests and verify they pass.
If you are adding new functionality, make sure to add tests for it.

```sh
# Backend tests: run from root folder
dotnet test
# Client tests: run from client folder
pnpm test   # make sure tests pass
```

## Code Style

### Frontend (TypeScript/Svelte)

- Svelte 5 runes are **mandatory** — use `$state`, `$derived`, `$props`, `$effect`. Use the `svelte-core-bestpractices` skill for patterns.
- Use generated API clients from `client/src/lib/api/generated/`
- Custom fetch/mutator logic lives in `client/src/lib/api/mutator/customInstance.svelte.ts`
- Use `@tanstack/svelte-query` (`createQuery`, `createMutation`) for data fetching
- Use tanstack svelte-form (`createAppForm` in `$lib/components/Form`) for forms
- All `goto()`/`href` must use `resolve()` or be typed `ResolvedPathname` (`svelte/no-navigation-without-resolve`)
- Shared logic/components across routes go in `$lib/` — don't deep-import across route trees
- `@kayord/ui` facts: `Alert.Root` variants are only `default` | `destructive`; `Button href` accepts `ResolvedPathname`; check `node_modules/@kayord/ui/dist/components/ui/<name>/` for variant defs

### Backend (C#/.NET)

- File-scoped namespaces
- Feature-based layout under `Pos.Api/Features/`
- Entities: singular, PascalCase; DTOs in `DTO/`
- Never commit secrets — use `dotnet user-secrets` locally

## Quick Reference

| Item             | Value                                           |
| ---------------- | ----------------------------------------------- |
| Run stack        | `aspire start`                                  |
| View logs        | `aspire logs`                                   |
| API docs         | `http://localhost:5000/scalar/v1`               |
| Aspire           | `use aspire skills to get details and logs`     |
| Set secret       | `dotnet user-secrets set "Key" "Value"`         |
| EF migrations    | VS Code tasks or `dotnet ef` CLI                |
| API client regen | Requires running API: `pnpm api` from `client/` |
