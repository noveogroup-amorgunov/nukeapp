# Technical design

Testing seam: the architecture guards are the only automatable seams in this
repo (no unit-test framework, consistent with prior changes) —
`lint:steiger` / `lint:dependency-cruiser` assert the fractal convention, the
lint suite plus `tsc` assert nothing broke, and the behavioral scenarios in
`product.md` are verified visually on the dev server (desktop + ≤ s-viewport).
No new seams.

## Migration shape

```
src/pages/main/
├── @fractal-widgets/
│   └── AdBlock/
│       ├── index.ts                    (unchanged export)
│       └── ui/AdBlock/*                (moved from src/widgets/AdBlock)
├── api/
├── ui/
│   ├── Page/Page.tsx                   (renders the inner sidebar container)
│   └── Page/Page.module.css            (new: inner sidebar layout)
└── index.ts
```

- Move `src/widgets/AdBlock` → `src/pages/main/@fractal-widgets/AdBlock`,
  structure and `data-fsd="widget/AdBlock"` stay as-is. Internal imports keep
  the `@/` aliases; the page imports the fractal relatively
  (`../../@fractal-widgets/AdBlock`, per ADR-0005 rule 5).
- `MainPage` becomes an inner-sidebar composition replicating `Layout`'s
  container behavior (see `Layout.module.css`): flex row with gap on desktop,
  `column-reverse` at ≤ s-viewport; content (existing lists) as a column, ad
  block in an `aside`-like wrapper — 300px fixed on desktop, full width on
  mobile. Styles in a page-local CSS module; AdBlock's own `margin-top: 64px`
  (sidebar-context artifact) is removed — the container owns spacing.
- `appRouter`: the `/` route element becomes plain `<LayoutProvider />`; the
  `AdBlock` import disappears from the router. `sidebarSlot` prop stays.
- Delete the empty `src/widgets` folder (AdBlock was its only slice); leave
  every widgets-related lint rule in the configs untouched.

## dependency-cruiser (`.dependency-cruiser.cjs`)

Three rules + graph pattern (rule names follow the existing `*-not-to-*` style):

1. `not-into-page-fractal-widgets` (error) — modules outside `src/pages/**`
   must not import `src/pages/<slice>/@fractal-*`:
   `from: { pathNot: ['^src/pages/'] }`,
   `to: { path: '^src/pages/[^/]+/@fractal-' }`.
2. `page-not-into-foreign-fractal-widgets` (error) — a page module must not
   import another page's fractal widgets (capture trick, as in
   `entity-not-to-entity`):
   `from: { path: '(^src/pages/)([^/]+)(/.*)?$' }`,
   `to: { path: '^src/pages/[^/]+/@fractal-', pathNot: '^$1$2(/|$)' }`.
3. `fractal-widget-not-to-widget` (warn) — the `widget-not-to-widget` analog
   for both global and sibling fractal widgets:
   `from: { path: '(^src/pages/[^/]+)/@fractal-widgets/([^/]+)/' }`,
   `to: { path: '^src/widgets/[^/]+/' }` plus a sibling rule
   (`to: { path: '^$1/@fractal-widgets/[^/]+/', pathNot: '$1/@fractal-widgets/$2' }`).
4. `collapsePattern` gains `'src/(pages/[^/]+/@fractal-widgets/[^/]+/)'`
   before the `src/(pages/[^/]+/)` entry, so each fractal widget is a separate
   graph node.

The privacy rules are formulated against `@fractal-` paths generally (they hold
for future `@fractal-features` etc. for free); no dedicated rules for sub-slice
types that don't exist yet.

## steiger (`steiger.config.js`)

- Relax `fsd/no-reserved-folder-names` for
  `./src/pages/**/@fractal-widgets/**` (verified single false positive:
  `ui` inside a fractal slice). Match the existing precedent style — one
  override block with a comment referencing ADR-0005. Anything else steiger
  flags during implementation gets fixed in code, not config, if possible.

## Docs (after implementation)

- `docs/architecture.md` — methodology section gains a fractal sub-slices
  bullet referencing ADR-0005.
- `docs/changes/add-fractal-sub-slices/` archived when all tasks check out.
