# Architecture

How the system is structured now at a high level. Detailed technical rationale lives in
`adr/`; implementation details live in code and in `changes/`.

## Frontend

React SPA built with Vite and TypeScript.

## Architecture methodology

Feature-Sliced Design (`app` / `pages` / `widgets` / `features` / `entities` /
`shared`), with two documented deviations from the canonical methodology:

- `@x/<entity>` cross-import public APIs between entities (see
  `entities/product/@x/*`)
- `widgets/Base*` sublayer for base widgets importable by other widgets

## State

- Redux Toolkit for state management
- RTK Query for server state, with reauth handling in `shared/api`
- `redux-remember` for persistence

## API

RTK Query API layer in `shared/api`, with base query and reauth handling.

## Mocking

MSW with `@msw/data` for API mocking.

## Tooling

- Storybook for component development
- Steiger and dependency-cruiser for architecture boundary checks
- ESLint (`@antfu/eslint-config`) for linting
