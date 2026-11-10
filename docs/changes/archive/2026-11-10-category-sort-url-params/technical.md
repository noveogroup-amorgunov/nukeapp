# Change: category-sort-url-params — technical design

## Implementation Decisions

- **URL is the single source of truth** for the Sort on the category page. The
  page reads the `sortBy` query param through the existing typed query params
  hook (zod schema with `.catch(undefined)`); the dropdown's `onChange` writes
  it via react-router's search params with `replace: true`. Back/forward
  re-sync falls out of the router re-render — no effect, no listener.
- **Delete the Redux slice** that exists solely to hold the page's `sortBy`
  (the slice, its lazy-injection registration in the store's lazy-slice
  interface, and its exports). Remove the one-shot mount effect that seeded the
  slice from the URL, and make the sort dropdown a controlled component
  (drop its internal `useState`).
- **Default is never serialized**: absent `sortBy` means Featured; picking
  Featured clears the param. The dropdown's "no param" selection renders as
  Featured.
- **Param name stays `sortBy`** — it matches the products API query param and
  the mock handlers that read it.
- **Schema enum derived once**: the zod enum is built from the keys of the
  sort-names map (typed as `Record<ProductSortBy, string>`, so its keys are
  exactly the union). Adding a variant to the type forces adding its display
  name, which automatically admits it to the URL schema — no silent drift, no
  third hardcoded copy.
- **Feature flag gates sorting entirely**: when `productsSort` is off, the URL
  param is ignored (forced Featured) and the dropdown is not rendered. The URL
  is not rewritten.
- **Explicit assumptions** (from grilling): no special handling for the flag
  arriving mid-session (flags default to `true` synchronously, so the common
  case never flips); no new write-helper in the shared router lib until a
  second query param exists.

## Testing Decisions

- Good tests here assert external behavior only: the URL, the ordering of the
  rendered grid, and the dropdown's shown selection — never internal state.
- **Seam: the running app in a browser.** The repo has no test framework and
  none is introduced; verification is manual against the Given/When/Then
  scenarios in `product.md` (all nine), driven from the dev server with the
  feature-flags override to exercise the flag-off scenario.
- Prior art: none — this is the first behaviorally specified change in the
  repo. If these scenarios regress more than once, revisit Playwright e2e at
  this same seam.

## Further Notes

- Provenance: grilling session 2026-10-25 over the raw item in `.scratch/`;
  the item returns to `needs-triage` there.
- The domain term **Sort** was added to `GLOSSARY.md` (page-scoped, default
  Featured).
- No ADR: the URL-as-source-of-truth decision is trivially reversible, so it
  fails the ADR test and lives here.
