# Tasks — rtk-query-codegen

Persistent execution state: work resumes from the first unchecked item.
Spec: `product.md` (WHY + WHAT), `technical.md` (HOW).

## 1. Codegen pipeline + OpenAPI spec

- [ ] Hand-write the OpenAPI 3.1 spec covering every endpoint the app uses;
      DTO fields named with domain words (spec is the naming authority)
- [ ] Add the codegen config and the generated slice in `shared/api`
- [ ] Add `api:generate` / `api:check` scripts; wire `api:check` into CI
- [ ] Commit the generated file; app untouched and green

Blocked by: none (can start immediately)

## 2. Store switches to the generated slice

- [ ] Register the generated slice: reducerPath, existing tagTypes
      (SESSION / WISHLIST / CART / USER), reauth pipeline
- [ ] Raw-DTO slices (cart, session, user, featureToggle, adBlock) consume
      generated hooks from `shared/api` directly; their mappers and DTO
      `types.ts` are removed
- [ ] Adapter places (product, category, wishlist entities; product details
      and popular products in their consuming slices) restore
      `transformResponse` with the existing mappers via `enhanceEndpoints`,
      tags wired in the same calls
- [ ] Replace per-slice `injectEndpoints` files; hooks re-exported by entity
      public APIs only for adapter-owned types

Blocked by: 1

## 3. Mocks centralized

- [ ] Move all MSW handlers into `shared/api/mocks/<domain>/`, replacing the
      colocated `__mocks__` directories
- [ ] Type mock data against the generated DTO types
- [ ] Move simulated latency into handlers (e.g. the category-details delay
      leaves the query arguments)

Blocked by: 1 (independent of 2)

## 4. Cleanup

- [ ] Delete dead mappers, per-slice DTO `types.ts`, stale `__mocks__` dirs
- [ ] Lint suite green (eslint, tsc, steiger, dependency-cruiser)

Blocked by: 2, 3

## 5. Verify and update current-state docs

- [ ] Manually walk through the behavioral scenarios in `product.md`,
      including the stale-generated-file check failing
- [ ] Update `docs/architecture.md`: API interaction method (codegen from
      spec, consumption rules)
- [ ] Change directory and ADR-0003 land on the implementation branch;
      PR #47 closed as obsolete after merge

Blocked by: 2, 3, 4
