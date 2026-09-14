# Tasks: refactor-layout-to-shared-ui

Execution checklist — the set of unchecked items is the current progress state.
Spec: `product.md` + `technical.md` in this directory. Work tickets top-to-bottom;
a ticket starts when all its blockers are checked.

## T1: DropdownMenu on Radix in shared/ui

Blocked by: none (can start immediately)

- [x] Add `@radix-ui/react-dropdown-menu` dependency
- [x] `shared/ui/DropdownMenu`: narrow API (trigger slot, items, selected, onSelect, align); if email-header row fights the narrow API, fall back to styled Radix re-exports — decision documented in code
- [x] Styles per Figma 15:695 State=Opened: white panel, radius 24, shadow (0,4,12 @25%), vertical padding 16, rows 35px / padding 8/16, hover+selected #f3f3f3; chevron rotation via `data-state` CSS, no runtime prop
- [x] `DropdownMenu.figma.yml` mapping + registry entry `15:695`
- [x] `DropdownMenu.stories.tsx`: closed/open, selected item (prior art: Button.stories.tsx)

## T2: debugMode → shared/services/debugMode

Blocked by: none (can start immediately)

- [x] Move slice + DebugModeProvider + DebugModeToggler to the new slice; module augmentation still works
- [x] Update consumers: appEntry (provider), storybook decorator (toggleDebugMode)
- [x] Behavior unchanged: body class `fsd-debug-mode`, toggler works, initial enabled; no data-fsd on service UI

## T3: Dumb Layout in shared/ui

Blocked by: none (can start immediately)

- [x] `shared/ui/Layout`: dumb skeleton — banner (close via useState, no persist), header (Logo + headerRightSlot), content `<Outlet />` + `<ScrollRestoration />`, optional sidebarSlot, footer; no data-fsd
- [x] `LayoutTitleSection` replaces PageHeader API (title + rightSlot); both category-page branches will consume it in T5
- [x] Registry entries: Layout `25:2110`, LayoutHeader `25:2534`, LayoutTitleSection `25:2147` + colocated figma.yml where non-trivial
- [x] `Layout.stories.tsx` updated for the new skeleton (prior art: existing Layout.stories.tsx)

## T4: LayoutProvider + header right slot, router rewiring, delete widget

Blocked by: T1, T2, T3

- [x] `app/providers/layout/LayoutProvider.tsx`: smart composition — Layout with headerRightSlot/sidebarSlot, DebugModeProvider + DebugModeToggler; data-fsd on app components only
- [x] `LayoutHeaderIcons`: Default = profile dropdown (Login item) + theme; Authorized = cart/wishlist IconButtons with badges + profile dropdown (email header row + Logout) + theme; icon order per Figma 25:2547
- [x] `LayoutUserProfile`: DropdownMenu, trigger = IconButton user icon; Login navigates /login; registry entry `25:2547` + variant-mapping note (State=runtime auth, not a prop)
- [x] Router: both route branches use LayoutProvider (sidebar via sidebarSlot on main branch); delete baseLayoutWithSidebar
- [x] Delete widgets/Layout and shared/ui/Announcement; appEntry no longer mounts DebugModeProvider directly
- [x] Browser pass: header Default/Authorized, banner dismiss, debug toggler, sidebar on main page

## T5: Category page — SortByDropdown + LayoutTitleSection, drop rc-dropdown

Blocked by: T1, T3

- [x] `SortByDropdown` rewritten on DropdownMenu: keep props/selected state/feature-toggle gating, "Sort By:" + value + chevron composition (chevron-up when open)
- [x] `Page.tsx`: PageHeader → LayoutTitleSection in both branches (loading logic unchanged)
- [x] Delete shared/ui/PageHeader; remove rc-dropdown from package.json (no other importers) + lockfile

## T6: Registry sweep, verification, docs, archive

Blocked by: T4, T5

- [x] Final registry sweep: all five nodes resolve, mapping paths exist
- [x] `pnpm lint` green: eslint, types, steiger, dependency-cruiser
- [x] Stories review (Layout, DropdownMenu) against Figma; manual browser pass (category sorting, both header states, banner, debug)
- [x] Update `docs/architecture.md` (layout composition: app providers + shared/ui; new shared/services slice)
- [x] Archive change dir to `docs/changes/archive/2026-09-14-refactor-layout-to-shared-ui/`; delete `.scratch/layout-refactor`
