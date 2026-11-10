# AGENTS.md

Nukeapp — React SPA ecommerce shop demo (Vite, TypeScript, Redux Toolkit, MSW) structured with Feature-Sliced Design.

## Agent skills

### Issue tracker

Incoming issues live under `.scratch/<feature>/`; accepted specs and tasks live in `docs/changes/<change-id>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage categories and states use their default names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` + `docs/adr/`. See `docs/agents/domain.md`.

### Development workflow

Change-based development (specs in `docs/changes/`), work scenarios (feature, bug, ADR, wayfinder, codebase health) and the process vocabulary — per ADR-0001. See `docs/agents/development-workflow.md`.

### Figma

UI work is driven from Figma through Figma Bridge MCP: the repo skill at `.agents/skills/figma/` covers component synchronization and design-to-code. Component identity (Figma node id → production component) lives in `.design-system/figma-registry.yml`; colocated `*.figma.yml` files hold API mappings. Rationale in ADR-0002.
