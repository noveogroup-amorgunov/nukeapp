# Refactor: Layout to shared/ui + Figma sync

Change: `refactor-layout-to-shared-ui` · Status: ready-for-agent · Date: 2026-09-14
Source: `.scratch/layout-refactor/item.md` (grilling rounds 1–3, decisions confirmed by maintainer)

## Problem Statement

The layout is a widget (`widgets/Layout`) that mixes a dumb visual skeleton with
smart concerns: session, cart/wishlist data, theme, feature toggles and a debug
mode model all live inside it. This couples the app skeleton to business
entities, makes the skeleton unusable outside the widget layer, and contradicts
the FSD guidance the codebase itself documents (dumb grid + smart composition in
app). The visual skeleton also drifted from the Figma uikit: announcement, page
header and dropdowns are styled ad hoc, `PageHeader`/`Announcement` have no
Figma counterparts, and the dropdown is built on the aging `rc-dropdown` instead
of the chosen Radix primitives.

## Solution

Move the dumb layout skeleton into `shared/ui/Layout`, redesigned from the
Figma Layout component (node 25:2110) and its local components. All smart
composition (header right slot, debug mode, sidebar) moves to
`app/providers/layout/LayoutProvider.tsx`. The debug mode model becomes an
infrastructural slice `shared/services/debugMode`. A new
`shared/ui/DropdownMenu` based on Radix `@radix-ui/react-dropdown-menu`
replaces `rc-dropdown` everywhere, including category sorting. Figma identity
is recorded in the central registry with colocated `*.figma.yml` mappings per
ADR-0002. The compositional widget and `PageHeader`/`Announcement` are deleted.

## User Stories

1. As a maintainer, I want the layout skeleton in `shared/ui`, so that the app shell is a dumb, reusable component with no entity imports.
2. As a maintainer, I want all smart layout composition in one place (`LayoutProvider`), so that reasoning about what the app shell renders requires reading a single file.
3. As a maintainer, I want the debug mode model in its own infrastructural slice, so that layout code does not own global dev-tooling state.
4. As a maintainer, I want Figma components of the layout registered with node IDs and colocated mappings, so that future design-to-code sessions resolve production components automatically.
5. As a maintainer, I want `rc-dropdown` removed from the project, so that we carry one dropdown implementation based on the chosen Radix primitives.
6. As a maintainer, I want `PageHeader` and `Announcement` deleted from `shared/ui`, so that no legacy component without a Figma identity lingers.
7. As a shop visitor, I want the page header to show cart, wishlist, profile and theme controls matching the design, so that the app looks and behaves like the Figma uikit.
8. As an authorized visitor, I want a profile dropdown containing my email and a Logout action, so that session controls are compact and match the design.
9. As an unauthorized visitor, I want a profile dropdown with a single Login item, so that I can sign in from the same compact control.
10. As a shop visitor, I want the category page sort control implemented as a dropdown menu with a highlighted selected option, so that sorting matches the designed states (Default/Opened, chevron direction, hover).
11. As a shop visitor, I want to dismiss the announcement banner, so that I can hide it while reading (without persistence in this change).
12. As a developer, I want debug mode to visually highlight FSD slices exactly as before, so that the refactor does not change dev tooling behavior.

## Implementation Decisions

These were settled during grilling (rounds 1–3); contradictions with the
initial request were resolved explicitly.

1. **Dumb layout in shared/ui.** `shared/ui/Layout` contains only dumb parts:
   grid skeleton (banner, header with Logo + right slot, content area, optional
   sidebar slot, footer), the banner (announcement) with a working close
   control, and `LayoutTitleSection`. No `data-fsd` attributes on shared/ui
   components.
2. **Smart composition in app.** `app/providers/layout/LayoutProvider.tsx`
   owns: header right content (icon controls, profile dropdown, theme), debug
   mode provider and toggler rendering, and the optional sidebar slot. It takes
   an optional `sidebarSlot` prop; route branches in the router decide whether
   to pass it. The old compositional widget (`baseLayoutWithSidebar`) is
   deleted; `LayoutProvider` is wired into the router in both route branches.
   `data-fsd` attributes remain on app-layer composition only.
3. **Header right slot content.** Default state: profile dropdown (single
   Login item) + theme control. Authorized state: cart and wishlist icon
   buttons with badges, profile dropdown (email + Logout item), theme control —
   icon order and styling per Figma `LayoutHeaderIcons` (25:2547, variants
   State=Default / State=Authorized). Badge data sources stay as they are
   (cart total quantity, wishlist product count).
4. **Profile dropdown content.** Per maintainer-confirmed Figma selection
   (instance 130:1378): menu shows the user's email at the top and Logout
   below. For unauthorized users the menu shows a single Login item navigating
   to /login. The old inline "Hey, email + logout" line disappears.
5. **DropdownMenu component.** New `shared/ui/DropdownMenu` wrapping Radix
   `@radix-ui/react-dropdown-menu` with a narrow API: trigger slot, items,
   selection, select callback. Menu styling from Figma Dropdown (15:695,
   State=Opened): white panel, radius 24, drop shadow, item rows with
   hover/selected background #f3f3f3; trigger chevron flips up when open.
   Trigger content is a slot — the sort control keeps its
   "Sort By: <value> ▾" composition in the category page.
6. **rc-dropdown removal.** Category `SortByDropdown` is rewritten on
   `DropdownMenu`; the `rc-dropdown` dependency is removed from the project.
   Sorting logic and state (category slice, enabled feature toggle) unchanged.
7. **LayoutTitleSection replaces PageHeader.** Figma component 25:2147 (title +
   right slot). Category page (both loading and loaded branches) uses it; the
   loading branch keeps its current behavior, just swapped to the new
   component.
8. **Banner close behavior.** Dismissal is local component state only — no
   persistence. Persistence is a separate follow-up item
   (`.scratch/banner-persist`).
9. **Debug mode slice.** `shared/services/debugMode` owns the redux slice, the
   body-class provider, and the toggler control. Imports in app entry and
   storybook decorator are updated. Behavior unchanged (body class
   `fsd-debug-mode`, toggled state, initial enabled).
10. **Figma registry and mappings.** Registry entries added for: Layout
    (25:2110), LayoutHeader (25:2534), LayoutTitleSection (25:2147),
    LayoutHeaderIcons (25:2547), Dropdown (15:695). Colocated `*.figma.yml`
    mappings created where Figma API → React API translation is non-trivial
    (variants, slots, dropdown states). Banner and footer remain plain frames
    in Figma — no components invented for them; the banner is a Layout-internal
    component without a figma.yml.
11. **Deleted**: `widgets/Layout` (entire widget), `shared/ui/PageHeader`,
    `shared/ui/Announcement`, the compositional widget file in app providers.

## Testing Decisions

No unit test runner exists in this repo and none is introduced for this
refactor. Verification seams:

1. **Storybook stories** as the primary test seam for dumb components:
   stories for `Layout`, `LayoutTitleSection`, `DropdownMenu` (open/closed,
   selected item). Prior art: existing `Layout.stories.tsx`,
   `Button.stories.tsx`. Visual check against Figma.
2. **Boundary checkers** as regression guards for the migration:
   `pnpm lint:steiger` (FSD layer violations), `pnpm lint:dependency-cruiser`
   (import rules), `pnpm lint:types` (tsc), `pnpm lint:eslint`. These must pass
   after the move — they are the automated proof that shared/ui imports
   nothing from upper layers.
3. **Manual browser pass** against the mock API: category page sorting, header
   in Default and Authorized states, profile dropdown (Login / email+Logout),
   banner dismissal, debug toggler.

Good tests here = stories exercising the public component API only; no
internal-state assertions.

## Out of Scope

- Banner dismissal persistence (tracked in `.scratch/banner-persist`).
- New header states beyond Default/Authorized as currently implemented
  (e.g. search control, cart/search badges beyond current data).
- Designing missing Figma components (Banner, Footer, profile menu as
  component set) — Figma stays source of truth as-is.
- Any unit/e2e test infrastructure.
- Sidebar content changes (AdBlock stays as-is, just re-wired).

## Further Notes

- Glossary updated during grilling: **Layout** and **Debug mode** terms added
  to `CONTEXT.md`.
- Figma node facts used above were verified via Figma Bridge MCP against
  nodes 25:2110, 25:2534, 25:2147, 25:2547, 15:695, 130:1378, 130:1454.
- After completion, update `docs/architecture.md` (layout composition moved
  from widgets to app providers + shared/ui; new shared/services slice) per
  the development workflow, then archive this change directory.
