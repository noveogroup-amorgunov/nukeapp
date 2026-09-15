# Tasks

## T1: Spec: add debugMode flag, drop query params

- [ ] `FeatureToggle` DTO gains `debugMode: boolean`; `/feature-toggle` request loses `darkMode`/`productsSort` query parameters
- [ ] Regenerate API client (`pnpm api:generate`); mocks return defaults with `debugMode: true`, query-param schema removed
- [ ] Lint/typecheck green

## T2: featureFlags service with overrides + global init

- [ ] `entities/featureToggle` moved to `shared/services/featureFlags` and renamed (public API: `useFeatureFlag`, `initFeatureFlags`, `FeatureToggler`)
- [ ] Override slice persisted via `redux-remember` (`featureFlags` replaces `debugMode` in `rememberedKeys`); effective value = override ?? backend
- [ ] `initFeatureFlags` thunk dispatched once from app init before first render; per-route router loaders deleted; fallback TODO preserved
- [ ] Consumers updated (header icons, category page); debug mode service still works off the flag; lint/typecheck/depcruise/steiger green

## T3: Feature toggler UI (modal + checkboxes)

- [ ] Floating control keeps cpu icon, renamed to `FeatureToggler`, opens `FeatureFlagsModal` from the feature flags service
- [ ] Modal lists all flags (`darkMode`, `productsSort`, `debugMode`) as checkboxes reflecting effective values; toggling changes app behavior immediately
- [ ] Overrides survive page reload; `debugMode` toggles the `fsd-debug-mode` body class

## T4: debugMode service slim-down

- [ ] Slice and persistence removed from the debug mode service; it keeps only its side-effect logic reading the `debugMode` flag from `featureFlags` (cross-service public-API import per ADR-0004)
- [ ] Body-class behavior unchanged; the old toggler component is fully gone from the service (replaced in T3)

## T5: Full data-fsd markup

- [ ] Every rendered component in all layers marked `data-fsd="<layer>/<slice>/<ComponentName>"` (pages included)
- [ ] Mislabeled values corrected (`feature/*` inside `pages/*` → real layer); service UI stays unmarked

## T6: dependency graph shows services

- [ ] Collapse pattern `src/(shared/services/[^/]+)/` added before the generic `shared` entry; regenerated graph shows each service as its own node

## T7: Docs update & archive

- [ ] `docs/architecture.md`: `shared/services` documented as the infrastructure layer with feature flags and debug mode services
- [ ] `tasks.md` fully checked; change archived to `docs/changes/archive/`
