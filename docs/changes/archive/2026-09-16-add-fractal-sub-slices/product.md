# Fractal sub-slices & main page AdBlock migration

## Problem Statement

Page-local widgets have no home in canonical FSD: `AdBlock` is used only by the
main page, yet lives in the global `widgets` layer — single-use code polluting
a layer reserved for reusable composition. It is even wired at the router level
(`sidebarSlot`), so its rendering is owned by `app` instead of the page it
belongs to. As page slices grow (samokat-style home pages with sliders,
listings, banners), splitting such units across the page's `ui` / `model` /
`api` segments would dissolve them (destructive decoupling, see ADR-0005).

## Solution

- Adopt the fractal sub-slices convention (ADR-0005): a slice may contain
  lower-layer slices under `@fractal-<layer>` folders, private to the owner.
- Migrate `AdBlock` into `pages/main` as the first fractal widget; the main
  page renders it in its own inner sidebar container that preserves the current
  `Layout` sidebar behavior (desktop: right rail, mobile: stacked on top).
- The `/` route stops passing `sidebarSlot`; the `Layout` sidebar capability
  stays untouched for future use.
- Architecture checks (dependency-cruiser, steiger, dependency graph) learn
  about `@fractal-*` folders.

## User Stories

1. As a developer, I want page-local widgets to live inside the page slice, so that single-use UI does not pollute the global widgets layer.
2. As a developer, I want a documented fractal sub-slices convention, so that complex page slices have a predictable home for their local units.
3. As a developer, I want sub-slices to be private to their owning slice (enforced by linters), so that accidental cross-slice reuse is caught before it hardens into coupling.
4. As a developer, I want an explicit promotion path (fractal → global layer), so that growing reuse is a visible migration, not a re-export.
5. As a visitor of the main page, I want the ad banner in the same place as before (desktop: right rail, mobile: above the lists), so that the migration does not change what I see.
6. As a developer, I want the dependency graph to show page sub-slices as individual nodes, so that page complexity stays visible.
7. As a developer, I want steiger and dependency-cruiser to accept and guard `@fractal-*` folders, so that the convention is checked, not improvised.

## Behavioral scenarios

- Given the main page is open on desktop (> s-viewport), when it renders, then the ad banner appears in a right-side inner sidebar next to the page lists.
- Given the viewport is ≤ s-viewport, when the main page renders, then the ad banner appears stacked above the page lists (current `Layout` sidebar mobile behavior).
- Given the ad offer is loading or missing, when the main page renders, then the banner renders nothing (existing behavior preserved).
- Given the dark theme is active, when the banner renders, then the dark image variant is used (existing behavior preserved).
- Given a module outside the owning page imports the page's `@fractal-*` code, when `lint:dependency-cruiser` runs, then it reports an error.
- Given a fractal widget imports a global or sibling widget, when `lint:dependency-cruiser` runs, then it reports a warning.
- Given `lint:steiger` runs with `@fractal-*` folders present, then it passes (no false positives).

## Out of Scope

- dependency-cruiser/steiger rules for `@fractal-features` / `@fractal-entities` — the convention is documented (ADR-0005), rules arrive with the first real use.
- Nesting fractals inside fractals (one level only).
- Migrating anything besides `AdBlock`.
- Removing the `sidebarSlot` capability from `Layout` / `LayoutProvider`.
- Moving AdBlock's RTK Query endpoint usage — it keeps importing from `shared/api` per the current API conventions.

## Further Notes

- Decision and rationale: ADR-0005 (`docs/adr/0005-fractal-sub-slices.md`).
- Reference implementation: `fsd-lessons/packages/custom-fractal-sub-slices`.
- After the migration `src/widgets` is empty (AdBlock was its only slice); the
  empty layer folder is deleted — FSD layers may be absent, and the existing
  widgets-related lint rules stay in place for when the layer returns.
