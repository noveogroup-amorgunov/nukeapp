# RTK Query codegen — product spec

id: rtk-query-codegen
status: ready-for-agent

## Why

The API layer grew one hand-written slice per FSD location: every entity, page
and widget repeats `injectEndpoints` with hand-written DTO `types.ts` and mapper
functions. The same endpoint knowledge is duplicated across slices, DTO naming
drifts from the domain vocabulary, and there is no single artifact that states
what the API is. A refactor-level change: app behavior stays the same, the way
the API layer is produced changes (see ADR-0003).

## What

The OpenAPI spec (`src/shared/api/openapi.json`, hand-written) becomes the single
source of truth for the API layer. The official RTK Query code generator produces
one committed slice (`api.generated.ts`); per-slice `injectEndpoints`, hand-written
DTO types and mappers are removed. The spec is the naming authority: DTO fields
carry domain names, so most slices consume raw DTO straight from `shared/api`
(see `CONTEXT.md`: **DTO**, **Adapter**).

Adapters survive only where a branded id or renamed field crosses a slice
boundary: product, product details, category, wishlist. All other slices
(cart, session, user, featureToggle, adBlock) use raw DTO.

MSW handlers are centralized in `shared/api/mocks/` grouped by domain; simulated
network delays live in handlers, not in query arguments. No runtime response
validation (types only from codegen).

## User stories

1. As a developer, I want one committed OpenAPI spec stating every endpoint, so
   that the API layer has a single source of truth instead of per-slice
   hand-written code.
2. As a developer, I want hooks generated from the spec, so that adding or
   changing an endpoint is a spec edit plus regeneration, not hand-written
   plumbing.
3. As a developer, I want raw DTO served directly for slices without adapters,
   so that mapper and DTO-type boilerplate exists only where the domain model
   genuinely differs.
4. As a developer, I want each cross-slice adapter defined once in its entity
   owner, so that consumers get identical domain types without duplicated
   transform logic.
5. As a developer, I want a CI check that fails when the generated file is
   stale relative to the spec, so that spec and code cannot silently drift.
6. As a maintainer, I want all MSW handlers in one place grouped by domain, so
   that the mocked backend can be read and changed as a whole.
7. As an agent working on this repo, I want the spec to name DTO fields with
   domain words, so that generated types are self-explanatory without reading
   mappers.

## Behavioral scenarios

```gherkin
Scenario: Stale generated file fails CI
  Given the spec at src/shared/api/openapi.json was edited
  And api.generated.ts was not regenerated
  When CI runs the api:check script
  Then the check fails and blocks the merge

Scenario: Endpoint served without adapter
  Given a slice without an adapter (e.g. cart, session, user)
  When the slice consumes its endpoint
  Then it imports the generated hook from shared/api directly
  And the response type equals the DTO from the spec

Scenario: Endpoint served through an adapter
  Given the product endpoints with a branded ProductId
  When any layer consumes a product hook
  Then it receives the domain Product type produced by the adapter
  And the adapter lives in the product entity, defined once

Scenario: Simulated delay belongs to the mock
  Given the category details endpoint under MSW
  When the page requests category details
  Then no delay parameter is part of the query arguments
  And the handler applies the simulated latency itself
```

## Out of scope

- A real backend; MSW remains the server.
- Runtime (zod) response validation — add later only if a real server drifts.
- Renaming or otherwise churning the existing tagTypes.
- Re-exports of plain generated hooks through entity public APIs.
- Any user-visible behavior change.
