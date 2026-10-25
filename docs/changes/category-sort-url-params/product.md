# Change: category-sort-url-params

## Problem Statement

On the category page, the selected Sort lives only in page state. A User who
picks an ordering cannot copy or share a link that reproduces it, a refresh
resets the grid to the default ordering, and browser back/forward do not
restore the ordering the User was looking at.

## Solution

The Sort is carried in the URL query parameter `sortBy`. The URL is the single
source of truth for the Sort on the category page: picking an option updates
the URL, loading (or revisiting via back/forward) a URL with `sortBy` renders
the grid in that ordering. The default Sort is never written to the URL, so
shared links stay clean.

## User Stories

1. As a User, I want my selected Sort reflected in the URL, so that I can copy and share a link that shows the category ordered the way I see it.
2. As a User, I want the Sort to survive a page refresh, so that reloading does not reset the ordering I chose.
3. As a User, I want browser back/forward to re-apply the Sort from the URL, so that navigation through my history is predictable.
4. As a User, I want the dropdown to show the Sort the products are actually ordered by, so that the UI and the grid always agree.
5. As a User, I do not want the default Sort written to the URL, so that links to a default-sorted category stay short and clean.
6. As a User, I want a sort change to replace the current history entry, so that pressing back takes me to where I was before the category page, not through every ordering I tried.
7. As a User, I want an unknown `sortBy` value in the URL to be ignored, so that stale or hand-edited links still render the category (with the default Sort) instead of breaking.
8. As a User, I want the Sort to reset to the default when I open a different category, so that every category starts in a predictable state.
9. As a User, when the `productsSort` Feature flag is off, I want no sorting applied at all — no dropdown, and the URL param ignored — so that flag-off behavior is consistent regardless of the link I follow.
10. As a User, I want picking the default Sort to remove the `sortBy` param, so that the URL never encodes a value the page would show anyway.
11. As a maintainer, I want a single source of truth for the Sort, so that the state-sync bug class this change fixes cannot reappear.
12. As a maintainer, I want the Sort value list defined once, so that adding a variant cannot be silently dropped from the URL schema.
13. As a maintainer, I want page-local view state out of Redux, so that Redux holds only state shared across the app.

## Behavioral scenarios

1. **Load with a param** — Given `/category/7?sortBy=PriceHighLow`, when the page loads, then the grid is ordered price high→low and the dropdown shows PriceHighLow.
2. **Change Sort** — Given `/category/7` (no param), when the User picks Newest, then the URL becomes `/category/7?sortBy=Newest` via a history replace, the grid reorders to Newest, and the dropdown shows Newest.
3. **Back to the default Sort** — Given `/category/7?sortBy=Newest`, when the User picks Featured, then the param is removed and the URL is `/category/7`.
4. **Refresh keeps the Sort** — Given `/category/7?sortBy=Newest`, when the User reloads, then the grid is still ordered Newest and the URL is unchanged.
5. **Back after changing Sort** — Given the User arrived at the category from the main page and then changed the Sort, when they press back once, then they land on the main page (the sort change did not add a history entry).
6. **Back/forward between pages keeps the Sort** — Given `/category/7?sortBy=Newest`, when the User opens a Product page and then presses back, then the category renders sorted by Newest with the dropdown showing Newest; pressing forward returns to the Product page.
7. **Unknown value ignored** — Given `/category/7?sortBy=Bogus`, when the page loads, then the grid is ordered Featured, the dropdown shows Featured, and no error is shown.
8. **Flag off disables sorting entirely** — Given the `productsSort` Feature flag is off and the URL is `/category/7?sortBy=Newest`, when the page loads, then the grid is ordered Featured, no dropdown is rendered, and the URL is left as-is.
9. **Sort resets across categories** — Given `/category/1?sortBy=Newest`, when the User opens `/category/2`, then it renders ordered Featured with no `sortBy` param.

## Out of Scope

- Other query params (filters, pagination) and a generalized URL-state helper; the write side uses react-router's search params directly until a second param exists.
- Persisting the Sort across categories or sessions (localStorage).
- Server-side rendering or SEO concerns.
- Browser e2e test automation (Playwright) — the testing seam is the running app in a browser (see technical.md).
- Deriving the Sort value list from the OpenAPI codegen.
