# AGENTS.md

Guidelines for coding assistants working on this repository. Vendor-neutral — intended for any AI coding tool (Claude Code, Codex, Cursor, etc.).

## Project overview

Nuxt 3 (Vue 3) port of the Starlang NLP Toolkit. Runs as a single Node/Nitro server built from `Dockerfile`. Data files (wordnets, dictionaries, corpora) ship alongside the build — some at the repo root (copied into `.output/` by the Dockerfile) and some under `public/` (served as static by Nuxt).

This is a fork of [kubarium/nlptoolkit](https://github.com/kubarium/nlptoolkit) maintained by [gokhanercan](https://github.com/gokhanercan). Fork-specific additions live in:

- `Dockerfile`
- `ops/` — ansible playbook, deploy notes
- This file

## Semantic versioning

The project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

### Version file

- **`package.json`** — the `"version"` field is the single source of truth. The UI reads it via `nuxt.config.ts` (`runtimeConfig.public.appVersion`) and renders it in the `NavBar` footer.

### When to bump each number

- **PATCH** (`1.0.0 → 1.0.1`): bug fixes, doc-only changes, dependency patch bumps, internal refactors with no observable behavior change.
- **MINOR** (`1.0.1 → 1.1.0`): new features, new pages/tools, non-breaking additions to routes or components. Reset PATCH to `0`.
- **MAJOR** (`1.1.0 → 2.0.0`): breaking changes — removed/renamed routes or APIs, schema changes, defaults flipped in user-visible ways. Reset MINOR and PATCH to `0`.

When torn between MINOR and PATCH, **prefer PATCH**. Pre-release suffixes (`1.2.0-beta.1`) are allowed when needed.

### Core rules

1. **Always bump `package.json`'s `version` when you change application code, the Dockerfile, or ops scripts.** Comment-only or AGENTS.md-only edits can skip a bump.
2. **Never skip numbers.** `1.0.3 → 1.0.4`, not `1.0.3 → 1.0.5`.
3. **Never reuse a number.** Once shipped or tagged, that number is burned.
4. **Never decrease a version.** Fix forward with a new PATCH.
5. **Bump once per logical change**, not once per file.
6. **Do not bump for CI/tooling/formatting-only changes.**

### Workflow for a coding assistant

When modifying code in this repo:

1. Decide MAJOR / MINOR / PATCH based on the user-visible impact of the change.
2. Update `package.json`'s `version` in the same commit as the code change.
3. If you add a new file that also records a version (e.g. a new installer), list it here so future updates stay in sync.
4. Do not create git tags unless the user asks.

If uncertain about the bump level, ask before committing.

## Build & run

Three helper scripts at the repo root cover common workflows:

- `./install.sh` — install pnpm (if missing) + project deps.
- `./run.sh` — `pnpm dev`, Nitro on `:3000`. Ctrl+C to stop.
- `./docker-run.sh` — `docker build` + `docker run` on `:3000`. Ctrl+C to stop (auto-removed).

See `ops/readme.md` for the production deployment flow (docker save → scp → docker load on a remote host).

## Upstream sync

- Upstream is `kubarium/nlptoolkit` (remote name: `upstream`).
- Fork is `gokhanercan/nlptoolkit` (remote name: `origin`).
- When syncing upstream, prefer **merge** (not rebase) to avoid force-pushing the fork's public commits.
