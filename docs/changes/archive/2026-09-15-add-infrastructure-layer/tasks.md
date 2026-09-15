# Tasks

## T1: Spec: add debugMode flag, drop query params

- [x] `FeatureToggle` DTO gains `debugMode: boolean`; `/feature-toggle` request loses `darkMode`/`productsSort` query parameters
- [x] Regenerate API client (`pnpm api:generate`); mocks return defaults with `debugMode: true`, query-param schema removed
- [x] Lint/typecheck green

## T2: featureFlags service with overrides + global init

- [x] `entities/featureToggle` moved to `shared/services/featureFlags` and renamed (public API: `useFeatureFlag`, `initFeatureFlags`, `FeatureToggler`)
- [x] Override slice persisted via `redux-remember` (`featureFlags` replaces `debugMode` in `rememberedKeys`); effective value = override ?? backend
- [x] `initFeatureFlags` thunk dispatched once from app init before first render; per-route router loaders deleted; fallback TODO preserved
- [x] Consumers updated (header icons, category page); debug mode service still works off the flag; lint/typecheck/depcruise/steiger green

## T3: Feature toggler UI (modal + checkboxes)

- [x] Floating control keeps cpu icon, renamed to `FeatureToggler`, opens `FeatureFlagsModal` from the feature flags service
- [x] Modal lists all flags (`darkMode`, `productsSort`, `debugMode`) as checkboxes reflecting effective values; toggling changes app behavior immediately
- [x] Overrides survive page reload; `debugMode` toggles the `fsd-debug-mode` body class

## T4: debugMode service slim-down

- [x] Slice and persistence removed from the debug mode service; it keeps only its side-effect logic reading the `debugMode` flag from `featureFlags` (cross-service public-API import per ADR-0004)
- [x] Body-class behavior unchanged; the old toggler component is fully gone from the service (replaced in T3)

## T5: Full data-fsd markup

- [x] Every rendered component in the business layers marked `data-fsd="<layer>/<slice>/<ComponentName>"` (pages included); `shared/ui` primitives and service UI intentionally unmarked (see technical.md)
- [x] Mislabeled values corrected (`feature/*` inside `pages/*` → real layer)

## T6: dependency graph shows services

- [x] Collapse pattern `src/(shared/services/[^/]+)/` added before the generic `shared` entry; regenerated graph shows each service as its own node

## T7: Docs update & archive

- [x] `docs/architecture.md`: `shared/services` documented as the infrastructure layer with feature flags and debug mode services
- [x] `tasks.md` fully checked; change archived to `docs/changes/archive/`
