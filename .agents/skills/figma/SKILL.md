---
name: figma
description: Work with Figma through Figma Bridge MCP for this repository. Resolve Figma component instances to production React components via the central registry and colocated *.figma.yml API mappings, and implement Figma frames in React using existing components and design tokens. Use when implementing a screen, page, or frame from a Figma design, synchronizing a Figma component with production code, or when asked about the Figma registry, .design-system/figma-registry.yml, or *.figma.yml mapping files.
---

# Figma skill

Source of Figma access is the **Figma Bridge MCP**, not the official Figma MCP /
Code Connect runtime. The decisions behind this workflow are recorded in
`docs/adr/0002-figma-integration-registry-and-mappings.md`.

## Two workflows

1. **Component synchronization** — connect a Figma component to the correct
   production React component, update the central registry, and create/update
   the colocated `*.figma.yml` when needed.
   Read [references/component-sync.md](references/component-sync.md) before acting.
2. **Design-to-code** — implement a Figma frame/view in React by resolving
   instances through the registry and composing mapped production components.
   Read [references/design-to-code.md](references/design-to-code.md) before acting.

For formats of both artifacts, read
[references/mapping-format.md](references/mapping-format.md).

If a task contains both, complete component synchronization first, then run
design-to-code against the updated registry.

## Core model

Two mapping layers with different ownership:

```text
Figma component instance
        ↓ node id
central registry (.design-system/figma-registry.yml)
        ↓
production React component
        ↓
optional colocated *.figma.yml
        ↓
Figma property/state → React API mapping
```

- **Registry** answers only: which production component corresponds to this
  Figma component? It owns `component`/`import` resolution.
- **Colocated `*.figma.yml`** answers only: how do Figma properties, states and
  content overrides translate to this component's real TypeScript API?

## Identity

The primary lookup key is the **Figma node ID** of the component/component set
(e.g. `1:223`). Figma Bridge MCP does not expose component keys — node ID is
the only stable identifier this toolchain provides. Node IDs survive renames
and moves within a file. The component name is readable metadata only.

Never derive FSD layer, slice ownership, import path, or component placement
from Figma names. A Figma component may legitimately map to a page- or
feature-local component; reusability does not imply `shared/ui`.

## Source-of-truth boundaries

- **Figma** — visual intent: composition, visual states, content hierarchy,
  layout intent, token usage.
- **Production code** — runtime architecture and the public component API.
- **Registry** — Figma → production component identity.
- **Colocated mapping** — non-trivial Figma API → code API translation.

## States

Figma interaction variants are presentation-only and map to CSS, never to
runtime props:

```text
Figma                            React / CSS
Default                          no prop
Hover / Pressed / FocusVisible   :hover / :active / :focus-visible
Disabled                         disabled={true}
Loading                          isLoading={true}
```

Never introduce `state="hover"`-style runtime props because Figma has those
variants. Figma drawing artifacts (scaled-down Pressed geometry, `"..."` text
placeholders) are not reproduced in code when they are editor artifacts rather
than intent.

## Tokens

Figma variables map 1:1 to CSS custom properties, slashes joined with dashes:
`--color/bg/brand` → `--color-bg-brand`, `--spacing/08` → `--spacing-08`.
Read the variable name in Figma, write the same name in CSS. Never invent a
token name without repository evidence; flag missing tokens instead of
hardcoding repeated literals.
