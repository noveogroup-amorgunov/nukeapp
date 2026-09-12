# RTK Query codegen — technical design

id: rtk-query-codegen

Durable decision and wiring diagram: ADR-0003. This file covers the change-local
design; it does not duplicate the ADR.

## Generation

- Hand-written OpenAPI 3.1 spec at `src/shared/api/openapi.json` describes every
  endpoint the app uses (the MSW backend is its reality check). DTO fields are
  named with domain words: where an adapter is removed, the spec renames the
  backend field instead of adding a mapper.
- The official RTK Query codegen (`@reduxjs/toolkit/query` codegen via
  `openapi-config.ts`) emits one `api.generated.ts` into `src/shared/api/`.
  The file is committed; scripts `api:generate` and `api:check` wrap the
  generation. `api:check` runs in CI only — no pre-commit hook.
- One generated slice on the existing `baseQueryWithReauth` pipeline; the
  reauth/access-token machinery (`baseQueryWithReauth`,
  `apiAccessTokenIsBrokenEvent`) is untouched.

## Consumption rules

- Raw DTO slices (cart, session, user, featureToggle, adBlock) import generated
  hooks from `shared/api` directly — no re-exports through entity public APIs,
  since shared is importable by every FSD layer.
- Cross-slice domain types get exactly one adapter in the entity owner, applied
  via `enhanceEndpoints` (tags + `transformResponse`):
  - product entity — product list/by-id hooks through `mapProduct`;
  - category entity — popular categories and category-with-products through
    `mapCategory` / `mapCategoryWithProducts`;
  - wishlist entity — wishlist hooks through `mapWishlist`.
    Consumers import these adapted hooks from the entity's public API.
- Single-slice endpoints keep their adapter in the consuming slice:
  `getPopularProducts` in the main page slice, product details in the product
  page slice.
- Tag wiring stays on the existing tagTypes (SESSION / WISHLIST / CART / USER)
  and happens in the same `enhanceEndpoints` calls as the customization above —
  customization and tags follow one placement rule.

## Deletions

- Per-slice `injectEndpoints` files (`entities/*/api`, `pages/*/api`,
  `widgets/*/api`) and their hand-written DTO `types.ts`.
- Mappers for all slices except the adapter list above; remaining mappers drop
  their hand-written DTO types in favor of generated ones.
- zod / hey-api remnants (none in production code today; the draft PR's
  approach is superseded).

## Mocks

- All MSW handlers merge into the single `src/shared/api/mocks.ts`, replacing
  the colocated `__mocks__` directories per slice. Handler order matters: MSW
  matches the first fitting handler, so specific paths (`/products/popular`)
  are registered before parameterized ones (`/products/:id`).
- Simulated latency (e.g. the current `delay: 400` query argument on category
  details) moves into handlers; query arguments carry no delay parameters.

## Testing decisions

- No test runner exists in the repo; verification is the lint suite (eslint,
  tsc, steiger, dependency-cruiser), `api:check`, and a manual walkthrough of
  the behavioral scenarios in `product.md`.
- Seams, for when a runner is adopted: the network seam is the existing MSW
  handlers (hooks/store tested against handlers — the highest seam); the only
  new seam is the spec-drift check (`api:check`); adapters are pure functions
  testable at the function seam. No new test infrastructure in this change.
- `api:check` doubles as the ongoing guard that committed generated code matches
  the spec.

## Prior art / reference

- Draft implementation: PR #47 (`feat/openapi-api-layer`) in
  noveogroup-amorgunov/nukeapp — reference only. Realization happens on a fresh
  branch; PR #47 is closed as obsolete after merge, with a comment pointing at
  the superseding change.
