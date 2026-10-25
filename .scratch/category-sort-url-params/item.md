---
status: needs-triage
---

# Category: sync sort with URL query params

Reporter: @amorgunov (maintainer), 2026-09-18.
Category (tentative): **enhancement**.

## Why

- A URL with the selected sort can be copied and shared.
- The sort state survives a refresh.
- Browser back/forward behave predictably.

Currently the sort selection on the category page lives only in state —
it is lost after a reload or when following a link.

## Triage findings (2026-10-25)

The item is **half-implemented** in `src/pages/category`:

- **URL → state: already works.** `Page.tsx` parses `sortBy` from the query via
  `useTypedQueryParams(pageQueryParamsSchema)`. The zod schema
  (`.enum(...).optional().catch(undefined)`) **ignores unknown values** and falls
  back to Redux (default `Featured` after a refresh). This answers the
  "unknown `sort` value" question: ignore.
- **State → URL: missing.** The dropdown dispatches `changeSortBy`, the URL is
  untouched. Back/forward also don't re-sync: the `useLayoutEffect` reads the
  URL once on mount (`[]` deps).
- State duplication: `SortByDropdown` keeps its own `useState` on top of the
  Redux slice; URL sync would add a third copy — worth cleaning up during
  implementation.

No prior rejections (`.out-of-scope/` does not exist).

## What to do (draft)

On the category page, write the selected `sort` to the URL query and re-sync
state on back/forward.

## Open questions (deferred to implementation / further work)

- Who is the source of truth — the URL or Redux/state? Today Redux is the
  runtime source and the URL is a one-shot initializer on mount; once the sort
  is written to the URL this split needs an explicit decision.
- Should the default sorting be written to the URL or omitted?
- Use `push` or `replace` when the sort changes?

Proposed defaults, not yet agreed: omit the default from the URL (cleaner
links); `replace` on sort change (a filter, not navigation).
