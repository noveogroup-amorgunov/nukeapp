# RTK Query codegen from a hand-written OpenAPI spec

There is no real backend — MSW handlers play the server — and the previous API layer
(per-slice `injectEndpoints`, hand-written DTO `types.ts` and mappers in every slice)
carried accidental complexity. We adopt the native RTK Query code generator fed by a
single hand-written OpenAPI 3.1 spec committed at `src/shared/api/openapi.json`; the
generated `api.generated.ts` is committed too, with `api:generate` / `api:check` scripts
(check runs in CI only) keeping it from drifting. The spec is the naming authority: DTO
fields carry domain names, so raw DTO can be served straight to the UI wherever no
branded id or rename crosses a slice boundary.

Rejected alternatives:

- **hey-api client** — was tried in an earlier draft; pulled in extra tooling (zod
  validation) for no benefit over the official RTK Query generator.
- **Runtime (zod) response validation** — dropped: types come from the spec; add
  validation later only if a real server drifts from the spec.
- **Keeping per-slice `injectEndpoints`** — replaced by one generated slice; all
  customization hangs off `enhanceEndpoints`.
- **Re-exports of plain generated hooks through entity public APIs** — dropped: shared
  is importable by every FSD layer, so raw hooks are imported from `shared/api` directly.

## How the API layer is wired

```
src/shared/api/openapi.json          ← hand-written, single source of truth
        │  pnpm api:generate
        ▼
src/shared/api/api.generated.ts      ← committed; pnpm api:check guards staleness in CI
        │
        ├─► raw DTO, no adapter
        │     cart, session, user, featureToggle, adBlock
        │     → import hooks from shared/api directly (any FSD layer may)
        │
        ├─► cross-slice domain types: one adapter in the entity owner
        │     entities/product   → enhanceEndpoints: tags + mapProduct
        │     entities/category  → enhanceEndpoints: tags + mapCategory / mapCategoryWithProducts
        │     entities/wishlist  → enhanceEndpoints: tags + mapWishlist
        │     → consumers import the adapted hooks from the entity's public API
        │
        └─► single-slice endpoints: adapter in the consuming slice
              pages/main    → getPopularProducts
              pages/product → productDetails
              → enhanceEndpoints lives next to the usage

Tag wiring (SESSION / WISHLIST / CART / USER tagTypes, unchanged) is declared
statically in the codegen config (endpointOverrides); slices' enhanceEndpoints
calls carry only transformResponse.

src/shared/api/mocks.ts              ← all MSW handlers in one file;
                                       simulated delays live in handlers, not query args
```

Realization: new branch (draft reference: PR noveogroup-amorgunov/nukeapp#47, to be
closed as obsolete after merge).
