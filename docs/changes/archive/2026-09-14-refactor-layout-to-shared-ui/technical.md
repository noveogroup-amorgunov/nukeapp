# Technical design: refactor-layout-to-shared-ui

HOW the change is implemented. Product/behavioral side: `product.md`.
Figma node facts verified via Figma Bridge MCP on 2026-09-14.

## Target structure

```text
src/
├── shared/
│   ├── services/debugMode/          # NEW infrastructural slice
│   │   ├── model/debugModeSlice.ts  # moved from widgets/Layout/model
│   │   ├── ui/DebugModeProvider/    # moved (body class fsd-debug-mode)
│   │   ├── ui/DebugModeToggler/     # moved (floating toggle control)
│   │   └── index.ts                 # slice, provider, toggler exports
│   └── ui/
│       ├── Layout/                  # NEW dumb skeleton (replaces widgets/Layout/ui/*)
│       │   ├── Layout.tsx           # grid: banner, header, content, sidebar?, footer
│       │   ├── LayoutBanner/        # internal: announcement with close (useState)
│       │   ├── LayoutHeader/        # internal dumb: Logo + rightContentSlot
│       │   ├── LayoutTitleSection/  # replaces shared/ui/PageHeader (Figma 25:2147)
│       │   ├── Layout.figma.yml     # mapping for 25:2110
│       │   ├── LayoutTitleSection.figma.yml
│       │   └── Layout.stories.tsx
│       └── DropdownMenu/            # NEW Radix wrapper (Figma 15:695)
│           ├── DropdownMenu.tsx     # Root/Trigger/Content/Item, narrow API
│           ├── DropdownMenu.module.css
│           ├── DropdownMenu.figma.yml
│           └── DropdownMenu.stories.tsx
├── app/
│   └── providers/
│       └── layout/
│           ├── LayoutProvider.tsx   # smart composition, optional sidebarSlot
│           └── ui/                  # header right slot internals:
│               ├── LayoutHeaderIcons/   # Default / Authorized composition
│               └── LayoutUserProfile/   # IconButton user trigger + dropdown
└── pages/category/ui/
    └── SortByDropdown/              # rewritten on shared/ui DropdownMenu
```

Deleted: `src/widgets/Layout/**` (whole widget),
`src/shared/ui/PageHeader/**`, `src/shared/ui/Announcement/**`,
`src/app/with-providers/layout/baseLayoutWithSidebar.tsx`.

## Component APIs

### shared/ui/Layout (dumb, no data-fsd)

```ts
type LayoutProps = {
  headerRightSlot?: ReactNode // header right content
  sidebarSlot?: ReactNode // optional aside column
  children?: ReactNode // routed content, rendered in <Outlet /> by provider? see note
}
```

Note: the current Layout renders react-router `<Outlet />` and
`<ScrollRestoration />` itself. Keep those inside the dumb Layout (router-owned
concerns that require no upper-layer imports); the provider wraps it.

### shared/ui/LayoutTitleSection (replaces PageHeader)

```ts
type LayoutTitleSectionProps = {
  title: string
  rightSlot?: ReactNode
}
```

Registry: `25:2147` → component, mapping file colocated. Figma: Title text 24
Bold #111111, RightSlot horizontal gap 10 (holds Dropdown instance).

### shared/ui/DropdownMenu (Radix, narrow API)

```ts
type DropdownMenuItem = { value: string, label: ReactNode, disabled?: boolean }
type DropdownMenuProps = {
  trigger: ReactNode // slot, uncontrolled open state
  items: DropdownMenuItem[]
  selected?: string // highlighted item (selected row #f3f3f3)
  onSelect?: (value: string) => void
  align?: 'start' | 'center' | 'end'
}
```

Built on `@radix-ui/react-dropdown-menu` (add dependency). Styling from Figma
15:695 State=Opened: panel white, radius 24, shadow (0,4,12 @25%), vertical
padding 16, item rows 35px height, padding 8/16, hover/selected bg #f3f3f3,
text Inter 16 Medium #111111. Trigger chevron rotation handled by consumer
(via Radix data-state on trigger or controlled open state — implement with
`data-state` CSS selector, no runtime prop).

Profile dropdown needs email (non-selectable header row) and Login/Logout as
items — expose a `header?: ReactNode` (non-interactive top row) or allow
children-composition fallback; choose during implementation, keep the narrow
API unless it fights Radix composition (then fall back to re-exporting Radix
parts styled via CSS — decision point for implementer, document in code).

### app/providers/layout

```ts
type LayoutProviderProps = { sidebarSlot?: ReactNode }
```

Composes: `<Layout>` with `headerRightSlot={<LayoutHeaderIcons />}`, optional
`sidebarSlot`, `DebugModeToggler`. Mounts `DebugModeProvider` (body class) —
currently mounted in appEntry; move under the provider tree so composition
stays in one place (appEntry keeps RouterProvider only).

Header right slot internals (app layer, data-fsd `app/...` allowed):

- `LayoutHeaderIcons`: selects authorized state; renders per Figma 25:2547:
  - Default: LayoutUserProfile (Login variant) + theme control
  - Authorized: cart IconButton (badge = cart total) → /user/cart, wishlist
    IconButton (badge = wishlist count) → /user/wishlist, LayoutUserProfile,
    theme control
- `LayoutUserProfile`: DropdownMenu, trigger = IconButton with user icon;
  authorized items: email (header row) + Logout (existing logout feature);
  unauthorized items: Login (navigate /login). Feature toggle `darkMode`
  gating for theme control stays as today.

## shared/services/debugMode

Move `debugModeSlice.ts` as-is (lazy inject into rootReducer, name
`debugMode`). Keep module augmentation imports working after the move. Update
consumers: `appEntry.tsx` (provider import), `storybookDecorators/withStore.tsx`
(`toggleDebugMode`). `data-fsd` attribute convention: the toggler is app-level
dev tooling living in shared/services — keep no data-fsd on it (service UI is
not a design-system component).

## Figma registry updates

Add to `.design-system/figma-registry.yml` (compact summary; final entries
follow the registry schema):

| Node    | figmaName          | component           | import                                        | mapping (colocated, when non-trivial)                                  |
| ------- | ------------------ | ------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| 25:2110 | Layout             | Layout              | `@/shared/ui/Layout`                          | `src/shared/ui/Layout/Layout.figma.yml`                                |
| 25:2534 | LayoutHeader       | LayoutHeader (dumb) | `@/shared/ui/Layout/LayoutHeader`             | — (only if non-trivial)                                                |
| 25:2147 | LayoutTitleSection | LayoutTitleSection  | `@/shared/ui/Layout/LayoutTitleSection`       | `src/shared/ui/Layout/LayoutTitleSection/LayoutTitleSection.figma.yml` |
| 25:2547 | LayoutHeaderIcons  | LayoutHeaderIcons   | `@/app/providers/layout/ui/LayoutHeaderIcons` | variants mapping (app-level)                                           |
| 15:695  | Dropdown           | DropdownMenu        | `@/shared/ui/DropdownMenu`                    | `src/shared/ui/DropdownMenu/DropdownMenu.figma.yml`                    |

Mapping notes: LayoutHeaderIcons State variants → authorized-dependent
composition (`presentation`-like split: State=Default/Authorized is runtime
auth state, not a prop — record in figma.yml as a decision so future
design-to-code does not invent a `state` prop). Dropdown State=Default/Opened
→ Radix open state (CSS `data-state`), not a prop.

## Category page rewiring

`SortByDropdown`: replace rc-dropdown with DropdownMenu; keep props
(`defaultSortBy`, `onChange`), internal selected state, feature-toggle gating,
"Sort By:" label + value + chevron composition. `Page.tsx` swaps `PageHeader`
→ `LayoutTitleSection` in both branches. Remove `rc-dropdown` from
package.json (verify no other importers) and lockfile.

## Migration checklist (mechanics)

1. Add `@radix-ui/react-dropdown-menu` dependency; build DropdownMenu + styles + stories.
2. Create shared/services/debugMode (move slice/provider/toggler), update imports.
3. Create shared/ui/Layout dumb components (+ banner close, LayoutTitleSection), stories, figma.yml files.
4. Create app/providers/layout (LayoutProvider, LayoutHeaderIcons, LayoutUserProfile), data-fsd on app components.
5. Rewire router: both route branches use LayoutProvider; delete baseLayoutWithSidebar.
6. Rewire category page (SortByDropdown on DropdownMenu, LayoutTitleSection).
7. Delete widgets/Layout, shared/ui/PageHeader, shared/ui/Announcement; remove rc-dropdown.
8. Update appEntry (remove DebugModeProvider if moved under LayoutProvider), storybook decorator imports.
9. Registry + figma.yml entries.
10. Verify: `pnpm lint` (eslint, types, steiger, dependency-cruiser), stories review, manual browser pass.
11. Update `docs/architecture.md`; archive change dir.
