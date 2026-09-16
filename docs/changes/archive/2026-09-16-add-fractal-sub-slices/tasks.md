# Tasks

## T1: AdBlock → fractal widget + main page inner sidebar

- [x] Move `src/widgets/AdBlock` → `src/pages/main/@fractal-widgets/AdBlock` (structure and `data-fsd="widget/AdBlock"` unchanged; `margin-top: 64px` removed from AdBlock CSS)
- [x] `MainPage` renders the inner sidebar container replicating `Layout` behavior (desktop: 300px right rail with gap; ≤ s-viewport: `column-reverse`, banner on top); container styles in a page-local CSS module
- [x] `/` route in the router uses plain `<LayoutProvider />`; `sidebarSlot` prop untouched
- [x] Empty `src/widgets` folder deleted; lint rules referencing widgets stay in the configs
- [x] `lint:eslint`, `lint:types`, `lint:steiger`, `lint:dependency-cruiser` green

## T2: Architecture guards (dependency-cruiser + steiger + graph)

- [x] dependency-cruiser: `not-into-page-fractal-widgets` (error) and `page-not-into-foreign-fractal-widgets` (error) privacy rules; `fractal-widget-not-to-widget` (warn) for global and sibling widgets
- [x] dependency-cruiser: `collapsePattern` gains `src/(pages/[^/]+/@fractal-widgets/[^/]+/)` before the pages entry; dependency graph regenerated with the fractal widget as a node
- [x] steiger: `fsd/no-reserved-folder-names` relaxed for `src/pages/**/@fractal-widgets/**` (comment referencing ADR-0005)
- [x] `lint:steiger` and `lint:dependency-cruiser` green on the migrated code (guard rules verified with a temporary probe import — both fire)

## T3: Docs update & archive

- [x] `docs/architecture.md` methodology section gains the fractal sub-slices bullet referencing ADR-0005
- [x] `tasks.md` fully checked; change archived to `docs/changes/archive/2026-09-16-add-fractal-sub-slices/`
