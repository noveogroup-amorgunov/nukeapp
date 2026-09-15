---
status: accepted
date: 2026-09-15
---

# Infrastructure layer formalized as `shared/services`

FSD v2.1 has no home for infrastructure services — technical capabilities that
support business logic without being business data (feature flags, debug mode,
theme engines, dialog managers). Everyone improvises: fragments scattered across
`shared/lib` + `app/providers`, theme parked in an entity, one-off `shared/*`
segments. I proposed an optional infrastructure layer in
[feature-sliced/documentation#818](https://github.com/feature-sliced/documentation/discussions/818);
until the methodology adopts it, we formalize the working shape in this repo:

**`shared/services` is our infrastructure layer** — full slices (model / ui /
lib / api segments, public `index.ts`) that may contain any segment, unlike the
rest of `shared`. Existing precedent: `shared/services/debugMode`. This change
migrates the feature flags there (`entities/featureToggle` was always an
infrastructure service wearing an entity costume).

Rules of the layer:

1. A service is a proper slice with a public API; nothing reaches into it from
   other layers beyond the public API.
2. Services may import each other's public API (e.g. `debugMode` reads the
   `debugMode` flag from `featureFlags`). The FSD cross-import ban applies to
   business slices; infrastructure services on one layer are allowed to
   compose — they are utilities of the app, not domain models.
3. Service UI is never marked with `data-fsd` — services are not slices under
   inspection of the debug mode highlighter.

Rejected alternatives:

- **Top-level `src/infrastructure` layer** — the "clean" version of the proposal;
  rejected while there are only two services: it costs import-rule changes in
  every linter and adds a hierarchy level for little gain. Revisit if the service
  count grows enough to warrant promotion (consistent with the discussion's
  conclusion).
- **Entity slices** (`entities/featureToggle`, the status quo) — misleads: a
  feature flag is not business data an entity would own; it blocked the debug
  mode service from owning its own flag.
- **`shared/lib/*` or custom `shared/*` segments** — services are full slices,
  not helpers or segments; steiger forbids `ui` in shared segments and the
  boundary between services disappears.

Consequences: `steiger.config.js` already tolerates `shared/services`; the
dependency-graph collapse patterns gain a dedicated `shared/services/<service>`
entry so services are visible individually. The layer is documented in
`docs/architecture.md`.
