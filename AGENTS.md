# AGENTS.md

Nukeapp — React SPA ecommerce shop demo (Vite, TypeScript, Redux Toolkit, MSW) structured with Feature-Sliced Design.

Guidelines for contributions, checks, and AI agent conventions live in [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) — read it before making changes.

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/<feature>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary of the five canonical triage roles (label string equals the role name). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.

### Development workflow

Change-based development (specs in `docs/changes/`), work scenarios (feature, bug, ADR, wayfinder, codebase health) and the process vocabulary — per ADR-0001. See `docs/agents/development-workflow.md`.

### Figma

UI work is driven from Figma through Figma Bridge MCP: the repo skill at `.agents/skills/figma/` covers component synchronization and design-to-code. Component identity (Figma node id → production component) lives in `.design-system/figma-registry.yml`; colocated `*.figma.yml` files hold API mappings. Rationale in ADR-0002.
