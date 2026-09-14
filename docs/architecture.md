# Architecture

How the system is structured now at a high level. Detailed technical rationale lives in
`adr/`; implementation details live in code and in `changes/`.

## Frontend

React SPA built with Vite and TypeScript.

## Layout composition

The app shell is split by smartness: the dumb skeleton (banner with close,
header, content, optional sidebar, footer) is a `shared/ui` component; all
smart composition — header right slot (cart/wishlist icon buttons, profile
dropdown, theme), debug mode provider and toggler, per-route sidebar — lives in
`app/providers/layout` and is wired into the router there.

## Architecture methodology

Feature-Sliced Design (`app` / `pages` / `widgets` / `features` / `entities` /
`shared`), with documented deviations from the canonical methodology:

- `@x/<entity>` cross-import public APIs between entities (see
  `entities/product/@x/*`)
- Infrastructural slices live directly in `shared` (e.g. `shared/services`
  with the debug mode slice); the app composition layer keeps providers in
  `app/providers` — both relax steiger naming rules (see `steiger.config.js`)

## State

- Redux Toolkit for state management
- RTK Query for server state, with reauth handling in `shared/api`
- `redux-remember` for persistence

## Design system

- Base UI primitives in `shared/ui` (Button, Text, Icon, Modal, ...)
- Design tokens in `shared/ui/tokens.css`, mirroring the Figma variable
  collection 1:1 (path slashes joined with dashes: `--color/bg/brand` →
  `--color-bg-brand`); the TS-side subset lives in `shared/ui/tokens.ts`
- Figma integration via Figma Bridge MCP: `.design-system/figma-registry.yml`
  maps Figma component node ids to production components, colocated
  `*.figma.yml` files adapt Figma properties to component APIs (rationale in
  `adr/0002-figma-integration-registry-and-mappings.md`)

## API

The hand-written OpenAPI spec in `shared/api` is the single source of truth for
the API layer; the official RTK Query codegen produces the committed generated
slice (`api:generate` / `api:check` guards staleness in CI). Most endpoints
serve raw DTO straight from `shared/api`; the Product / Category / Wishlist
entities own one adapter each (`enhanceEndpoints` + mappers) for their
cross-slice domain models, single-slice endpoints adapt in the consuming slice.
Tags are the four existing tagTypes, declared in the codegen config;
slices' `enhanceEndpoints` calls carry only `transformResponse` (rationale and wiring diagram in `adr/0003-rtk-query-codegen-from-handwritten-spec.md`).

## Mocking

MSW with `@msw/data` for API mocking; handlers centralized in the single
`shared/api/mocks.ts`, simulated latency lives in handlers.

## Tooling

- Storybook for component development
- Steiger and dependency-cruiser for architecture boundary checks
- ESLint (`@antfu/eslint-config`) for linting
