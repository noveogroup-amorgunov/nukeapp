# Tasks — category-sort-url-params

Resumes from the first unchecked item.

## 1. Sort is carried in the URL

**What to build:** the category page's Sort is the URL's `sortBy` param end to
end. Picking an option in the sort dropdown rewrites the URL via a history
replace; loading or revisiting (back/forward) a URL with `sortBy` renders the
Product grid in that ordering with the dropdown matching; the default Sort is
never serialized; unknown values fall back to Featured; the `productsSort`
Feature flag off disables sorting entirely; the category page's Redux slice and
the dropdown's local state are deleted — the URL is the single source of truth.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Given `/category/7?sortBy=PriceHighLow`, when the page loads, then the grid is ordered price high→low and the dropdown shows PriceHighLow (product.md scenario 1)
- [ ] Given `/category/7` (no param), when the User picks Newest, then the URL becomes `/category/7?sortBy=Newest` via a history replace, the grid reorders, the dropdown shows Newest (scenario 2)
- [ ] Given `/category/7?sortBy=Newest`, when the User picks Featured, then the param is removed and the URL is `/category/7` (scenario 3)
- [ ] Given `/category/7?sortBy=Newest`, when the User reloads, then the grid is still ordered Newest and the URL is unchanged (scenario 4)
- [ ] Given the User arrived from the main page and changed the Sort, when they press back once, then they land on the main page (scenario 5)
- [ ] Given `/category/7?sortBy=Newest`, when the User opens a Product page and presses back, then the category renders sorted Newest; forward returns to the Product page (scenario 6)
- [ ] Given `/category/7?sortBy=Bogus`, when the page loads, then the grid is ordered Featured, the dropdown shows Featured, no error (scenario 7)
- [ ] Given the `productsSort` Feature flag is off and the URL has `sortBy=Newest`, when the page loads, then the grid is ordered Featured, no dropdown, URL untouched (scenario 8)
- [ ] Given `/category/1?sortBy=Newest`, when the User opens `/category/2`, then it renders Featured with no `sortBy` param (scenario 9)
- [x] The category page Redux slice (state, registration, exports) and the dropdown's internal state no longer exist; the Sort value list is defined once (derived into the URL schema from the sort-names map)
