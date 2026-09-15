# Infrastructure layer & feature flags service

## Problem Statement

Infrastructure services have no canonical home: `entities/featureToggle` is an
infrastructure capability parked in the entity layer, while `shared/services/debugMode`
already exists as the informal layer. Feature flags (`darkMode`, `productsSort`)
can only be changed by editing URL query params — there is no runtime control.
Debug mode is toggled by its own button, disconnected from the flags, and most
components are not marked for the debug highlighter, so the mode shows only a
fraction of slice boundaries.

## Solution

- Formalize `shared/services` as the infrastructure layer (ADR-0004) and move
  feature flags there, renamed `featureFlags`.
- All flags become checkbox-toggled at runtime in a modal opened by the floating
  control (the current debug mode button, same icon). The `debugMode` flag joins
  the backend flag set and enables the debug mode service.
- The floating button renames to the feature toggler; the modal and its checkbox
  list live inside the feature flags service.
- All components in the business layers get correct `data-fsd` markup
  (`shared/ui` primitives and service UI excluded — see `technical.md`).

## User Stories

1. As a developer, I want infrastructure services to live in a dedicated layer, so that the app structure tells technical capabilities apart from business data.
2. As a developer, I want a feature flags service with a public API, so that any slice can read flags without coupling to its internals.
3. As a developer, I want to toggle every feature flag from one UI, so that I can test flag combinations without editing URLs.
4. As a developer, I want flag overrides to survive a page reload, so that my chosen combination persists during a session.
5. As a developer, I want the debug mode to be just another feature flag, so that enabling it follows the same mechanism as other flags.
6. As a developer, I want the debug mode service to keep ownership of its visual effect, so that flag values remain plain booleans while the service owns its side effect.
7. As a developer, I want services to import each other's public API, so that a service can react to another service's state without duplicating it.
8. As a developer, I want every rendered component in the business layers marked with `data-fsd`, so that the debug highlighter shows all slice boundaries, not a sample.
9. As a developer, I want mislabeled `data-fsd` values corrected, so that the highlighter does not lie about which slice a component belongs to.
10. As a developer, I want the dependency graph to show each infrastructure service separately, so that service boundaries are visible in the graph.

## Behavioral scenarios

- Given the app has booted, when the floating control is clicked, then a modal opens listing every feature flag (`darkMode`, `productsSort`, `debugMode`) as a checkbox.
- Given a checkbox is toggled, when the modal is open or closed, then the flag's effective value changes immediately across the app (e.g. `debugMode` toggles the `fsd-debug-mode` body class).
- Given flags were overridden locally, when the page is reloaded, then the overridden values are still in effect.
- Given no local override exists for a flag, then its effective value is the backend-provided value.
- Given the debug mode flag is enabled, when any marked component is rendered, then it is visually highlighted with its slice path label.
- Given the backend response fails, when the app boots, then the app still boots (current fallback behavior preserved).

## Out of Scope

- URL query params as a flag source (removed; no replacement deep-linking mechanism).
- Reset-overrides control in the modal.
- Promoting `shared/services` to a top-level layer.
- Persisting overrides per-user on the backend.

## Further Notes

Original idea and discussion context:
`feature-sliced/documentation#818` (infrastructure layer proposal), local example
implementation in `fsd-lessons/packages/custom-infrastructure-services`.
