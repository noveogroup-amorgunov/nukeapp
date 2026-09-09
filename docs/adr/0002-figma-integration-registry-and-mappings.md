---
status: accepted
date: 2026-09-09
---

# Figma integration: node-ID registry with colocated API mappings

UI work is driven from Figma through the **Figma Bridge MCP** (`gethopp/figma-mcp-bridge`):
an agent resolves Figma component instances to production React components and
implements frames using the existing code, instead of re-creating visuals from
pixels. The mapping between the two worlds is held by two artifacts with
separated ownership:

1. **Central registry** — `.design-system/figma-registry.yml`. Maps stable
   Figma identity to production code identity (`component` + `import`).
   Answering only "which production component corresponds to this Figma
   component". Consumed by agents and humans; never imported by runtime code.
2. **Colocated `*.figma.yml`** — sits next to the component it describes
   (`src/shared/ui/Button/Button.figma.yml`). An adapter translating Figma
   properties/states/content overrides to the component's real TypeScript API.
   Created only when the translation is non-trivial; absent for trivially
   aligned components.

Source-of-truth boundaries: Figma owns visual intent (composition, states,
hierarchy, token usage); production code owns runtime architecture and the
public component API; the registry owns identity; the colocated mapping owns
non-trivial API translation. Figma component names are metadata and never
determine FSD layer, slice ownership, or import path — a Figma component may
legitimately map to a page- or feature-local component.

## Identity: Figma node ID, not componentKey

The primary lookup key is the **Figma node ID** of the component/component set
(e.g. Button = `1:223`), with the human-readable name kept as metadata. This
deviates from the common "stable componentKey" advice: the Figma Bridge MCP
does not expose component keys at all — node ID is the only stable identifier
the toolchain actually provides. Node IDs survive renames and moves within a
file, which is sufficient for a single uikit file whose components may live on
both the `UIKIT` and `PAGES` pages. The file itself must be saved (not an
unsaved scratch), or registry entries point at a transient identity.

## Component API and states

The production component API wins over Figma naming. Figma interaction
variants (Hover, Pressed, FocusVisible) are presentation-only and map to CSS
pseudo-classes, never to runtime props; semantic states (Disabled, Loading)
map to real props. Figma drawing artifacts (scaled-down Pressed geometry,
`"..."` text as a loading placeholder) are not reproduced in code when they are
editor artifacts rather than intent — with genuine divergences deferred to
separate tasks rather than silently resolved.

## Design tokens

Figma variables map 1:1 to CSS custom properties by joining path segments with
dashes (`--color/bg/brand` → `--color-bg-brand`; `--spacing/08` →
`--spacing-08`). An agent reads a variable name in Figma and writes the same
name in CSS — no translation table. The app's dark theme predates the
integration and has no Figma counterpart; its migration onto tokens is a
separate task, and no dark values are invented on the code side in the
meantime.

## Workflow

Both workflows — component synchronization (registry + mapping upkeep) and
design-to-code (implementing frames) — are encoded as a single repository skill
(`.agents/skills/figma`, un-ignored in git as a deliberate exception inside the
skills-managed `.agents/` directory). The skill is versioned with the code
because the registry and mappings it describes are repository artifacts. The
registry grows incrementally — components are registered through the
sync workflow as they are actually integrated, starting with Button — rather
than being bulk-seeded from the Figma file.

## Considered Options

- **Official Figma Code Connect (`.figma.ts`)**: requires the Code Connect
  runtime and CLI, heavier than this project needs; the registry and colocated
  YAML mappings can later serve as migration input if it is adopted.
- **Registry keyed by component name**: readable, but breaks on renames and
  collides across pages; the name stays metadata only.
- **Registry keyed by componentKey**: the textbook approach, but the key is not
  exposed by Figma Bridge MCP — the rule would be untestable in this toolchain.
- **TS-module registry**: compile-time-checked imports, but nothing in the app
  imports the registry, so the checks would never run; YAML diffs better and
  keeps runtime clean.
- **Two separate skills (sync / design-to-code)**: duplicates the shared core
  model (registry, mapping format, identity, boundaries) into two files that
  would drift; one skill with references keeps the model in one place.
