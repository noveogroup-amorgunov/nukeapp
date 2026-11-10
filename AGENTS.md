# AGENTS.md

Nukeapp — React SPA ecommerce shop demo (Vite, TypeScript, Redux Toolkit, MSW) structured with Feature-Sliced Design.

## Git workflow

- Each feature uses its own integration branch; use the `worktree/` prefix for
  agent-created branches. Reuse that feature's branch when resuming work.
- Follow `/implement-spec` for task branches, isolated worktrees and integration.
- Use conventional-commit prefixes and run `/code-review` before every commit.

## Agent skills

### Issue tracker

Incoming items are `.scratch/NNN-<slug>.md` files. Spec-driven work uses
`docs/changes/<change-id>/`; direct implementation uses the source item.
See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage categories and states use their default names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` + `docs/adr/`. See `docs/agents/domain.md`.

### Development workflow

Project commands live in `.opencode/commands/`: `/do-triage` captures incoming
work, `/do-implement` designs and implements through a spec, `/do-fast-implement`
implements an actionable item directly, and `/do-archive` closes completed work.
See `docs/agents/development-workflow.md` for their steps, artifact mappings and
completion rules, per ADR-0001.

### Figma

UI work is driven from Figma through Figma Bridge MCP: the repo skill at `.agents/skills/figma/` covers component synchronization and design-to-code. Component identity (Figma node id → production component) lives in `.design-system/figma-registry.yml`; colocated `*.figma.yml` files hold API mappings. Rationale in ADR-0002.
