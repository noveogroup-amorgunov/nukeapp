# Technical design

Testing seam: the feature flags service public API (`useFeatureFlag`,
`initFeatureFlags` thunk) against the existing MSW mocks — one seam, the highest
available. Everything above it (debug mode effect, modal UI) is verified by the
behavioral scenarios in `product.md`; no new seams.

## Spec change

- `FeatureToggle` DTO gains `debugMode: boolean`.
- `/feature-toggle` loses its `darkMode`/`productsSort` query parameters — flags
  are no longer request-parameterized.
- Regenerate the API client (`pnpm api:generate`); mocks drop the
  query-param schema and return defaults with `debugMode: true` (preserves
  current initial behavior).

## shared/services/featureFlags (moved + renamed from entities/featureToggle)

```
shared/services/featureFlags/
├── model/  override slice (name: featureFlags) + fetched-flag state
├── lib/    initFeatureFlags thunk, useFeatureFlag
├── ui/     FeatureToggler (floating control), FeatureFlagsModal (checkbox list)
└── index.ts
```

- Effective flag value = local override ?? backend value. The override slice is
  persisted via `redux-remember` (`featureFlags` replaces `debugMode` in
  `rememberedKeys`).
- `initFeatureFlags` — redux thunk wrapping the existing loader logic
  (RTK Query `initiate` / `unwrap` / `unsubscribe`, fallback TODO preserved).
  Dispatched once from `appEntry` during app init before first render; the two
  per-route router loaders are deleted (pattern after the
  `custom-infrastructure-services` app-loader idea, adapted from reatom to
  redux).
- `FeatureToggler` keeps the current cpu icon and moves from the debug mode
  service; it opens `FeatureFlagsModal` through the existing `shared/ui` Modal.
- Public API: `useFeatureFlag`, `initFeatureFlags`, `FeatureToggler`.

## shared/services/debugMode (slimmed)

- The redux slice and its persistence entry are deleted — the flag now lives in
  `featureFlags` (backend-set + overridable), and persistence rides the
  `featureFlags` slice.
- The service keeps its full side-effect logic: it reads
  `useFeatureFlag('debugMode')` and owns the `fsd-debug-mode` body class
  (cross-service public-API import, allowed per ADR-0004).
- `DebugModeToggler` moves out (becomes `FeatureToggler` in `featureFlags`);
  `DebugModeProvider` stays.

## data-fsd markup

- Every rendered component in all layers gets
  `data-fsd="<layer>/<slice>/<ComponentName>"` (pages included: values currently
  labeled `feature/*` inside `pages/*` are corrected to their real layer).
- Service UI stays unmarked (ADR-0004 rule 3), so the `FeatureSliceLayers` type
  does not change.

## dependency-cruiser

- Collapse pattern gains `src/(shared/services/[^/]+)/` before the generic
  `shared` entry (same shape as the fsd-lessons config) so each service is a
  separate node in the graph.

## Docs

- ADR-0004 written upfront (layer decision + service-import rule).
- `docs/architecture.md` updated after implementation: `shared/services` as the
  infrastructure layer, debug mode + feature flags services.
