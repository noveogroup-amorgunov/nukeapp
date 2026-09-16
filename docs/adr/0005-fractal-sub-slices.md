---
status: accepted
date: 2026-09-16
---

# Fractal sub-slices (`@fractal-<layer>` inside a slice)

Page slices grow: a samokat-style home page collects product sliders, category
listings, promo banners — each with its own UI, model and API. Splitting them
across the page's `ui` / `model` / `api` segments is destructive decoupling: the
"awesome products slider" dissolves into four folders. Moving such units to the
global `widgets` layer pollutes it with page-only code (and needs `widgets/@home`
grouping hacks once several pages do this). This is the fractal sub-slices idea
from [feature-sliced/documentation#716](https://github.com/feature-sliced/documentation/discussions/716#discussioncomment-12926049)
(an experimental extension, not part of FSD v2.1; reference implementation in
[fsd-lessons/custom-fractal-sub-slices](https://github.com/noveogroup-amorgunov/fsd-lessons/tree/main/packages/custom-fractal-sub-slices)).

**We adopt fractal sub-slices as a documented deviation**: a slice may nest
lower-layer slices inside itself under `@fractal-<layer>` folders. Rules:

1. The sub-slice type is always strictly below the owning slice's layer: a page
   may contain `@fractal-widgets`, `@fractal-features`, `@fractal-entities`; a
   widget may contain `@fractal-features`, etc. Fractal folders are not named
   after the owner (`@local-*`, `@home-*`) — the type is in the name.
2. One nesting level only: no `@fractal-*` inside a `@fractal-*`.
3. A sub-slice is a proper slice: public API `index.ts`, standard segments,
   one entity per folder — same rules as global slices.
4. Sub-slices are private to the owning slice: nothing outside it imports them
   (directly or via the owning slice's public API). When a sub-slice is needed
   by another slice, it is promoted to the global layer — not re-exported.
5. Import style inside the owning slice is relative (`../@fractal-widgets/X`),
   matching existing same-slice imports.

Enforcement in this repo: dependency-cruiser gains rules making sub-slices
private to the owning slice (error) and forbidding a fractal widget from
importing global or sibling widgets (warn, the `widget-not-to-widget` analog);
`steiger.config.js` relaxes `fsd/no-reserved-folder-names` for `@fractal-*`
folders; the dependency-graph `collapsePattern` collapses
`src/(pages/[^/]+/@fractal-widgets/[^/]+/)` so sub-slices appear as individual
graph nodes.

The first application migrates `widgets/AdBlock` (used by a single page) to
`pages/main/@fractal-widgets/AdBlock`. Rule 5 is the promotion path, not a
dead end: if a second page needs the ad block, it moves to the global
`widgets` layer.

Rejected alternatives:

- **Global `widgets` layer for page-only widgets** (or `widgets/@home`
  grouping, per the discussion) — pollutes the reusable layer with single-use
  code, and the grouping notation covers only the page→widget use case while
  fractals also allow features/entities sub-slices anywhere.
- **Plain page segments** (status quo) — destructive decoupling: a complex unit
  scatters across `ui`/`model`/`api` of the page, its pieces cannot be moved,
  reviewed or deleted as a whole.
- **Plain component in the page's `ui` segment** (the "why call it a widget"
  objection) — fits dumb markup; a unit with its own API queries, derived model
  and css modules is a slice, not a component.
