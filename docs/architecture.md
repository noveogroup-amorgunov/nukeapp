# Architecture

How the system is structured now at a high level. Detailed technical rationale lives in
`adr/`; implementation details live in code and in `changes/`.

## Frontend

React SPA built with Vite and TypeScript.

## Architecture methodology

Feature-Sliced Design (`app` / `pages` / `widgets` / `features` / `entities` /
`shared`), with one documented deviation from the canonical methodology:

- `@x/<entity>` cross-import public APIs between entities (see
  `entities/product/@x/*`)

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

RTK Query API layer in `shared/api`, with base query and reauth handling.

## Mocking

MSW with `@msw/data` for API mocking.

## Tooling

- Storybook for component development
- Steiger and dependency-cruiser for architecture boundary checks
- ESLint (`@antfu/eslint-config`) for linting
