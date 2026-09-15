# fix-dark-theme — technical design

## Implementation Decisions

1. **Theme application = store subscription, not middleware, not ThemeProvider.**
   The `theme` slice is persisted via redux-remember, and rehydration dispatches
   bypass the middleware chain (documented in appEntry for the access-token
   sync). A middleware would silently miss the persisted theme on reload. A
   store subscription catches every change including rehydration, and mirrors
   the existing `syncApiAccessToken` pattern: `syncTheme()` called once at
   startup + `appStore.subscribe(syncTheme)`. The effect sets
   `document.documentElement[data-theme]` from `themeSlice.selectors.currentTheme`.
   ThemeProvider is deleted; the app entry no longer wraps children in it.

2. **`!darkModeIsEnabled` check is removed from the sync.** The `darkMode`
   feature flag gates only the visibility of the switch control in the layout
   header icons. Theme application is unconditional.

3. **Cross-import cleanup.** `@/entities/featureToggle/@x/theme` becomes unused
   after ThemeProvider removal and is deleted.

4. **Storybook theming without ThemeProvider.** The storybook store (in
   `withStore`) is exported; the `withTheme` decorator dispatches
   `themeSlice.actions.toggle(theme)` when the store's currentTheme differs from
   the theme global. The attribute sync in stories happens through the store
   itself (a store created by `makeStore` performs the same DOM sync, so the
   subscription lives with the store, not with appEntry only).

5. **Icon dark-mode crutch removed.** `filter: invert(1)` is deleted from
   Icon.module.css. All icon SVGs already use `currentColor` (stroke; `liked`
   uses fill), so the Icon painted via `--color-text-primary` adapts to the dark
   Theme without any filter.

6. **Dark token overrides for every color token.** Initial mapping below —
   values are hand-picked (no Figma counterpart, free plan), seeded from the
   four existing dark values, verified visually in Storybook and adjusted in
   place:

   | Token                                       | Dark value  | Rationale                                   |
   | ------------------------------------------- | ----------- | ------------------------------------------- |
   | `--color-text-primary`                      | `#f7f8f8`   | existing                                    |
   | `--color-text-secondary`                    | `#a0a8ac`   | muted gray, same relative contrast as light |
   | `--color-text-primary-inverse`              | `#111111`   | swaps with light `text-primary`             |
   | `--color-text-brand`                        | `#828fff`   | existing                                    |
   | `--color-bg-primary`                        | `#212a2e`   | existing                                    |
   | `--color-bg-primary-pressed`                | `#1b2428`   | one step darker than bg-primary             |
   | `--color-bg-brand`                          | `#828fff`   | matches dark brand text                     |
   | `--color-bg-brand-pressed`                  | `#6a78e0`   | one step darker than bg-brand               |
   | `--color-bg-secondary`                      | `#1a2327`   | existing                                    |
   | `--color-bg-secondary-pressed`              | `#141c20`   | one step darker than bg-secondary           |
   | `--color-bg-brand-muted`                    | `#828fff4d` | same alpha over dark brand                  |
   | `--color-bg-backdrop`                       | `#1111117a` | unchanged, works on both themes             |
   | `--color-bg-danger`                         | `#e44b4b`   | unchanged, reads on dark                    |
   | `--color-bg-danger-pressed`                 | `#cf3939`   | unchanged                                   |
   | `--color-bg-primary-inverse`                | `#ffffff`   | swaps with light `bg-primary-inverse`       |
   | `--color-base-focus`                        | `#1d87de`   | unchanged, visible on dark                  |
   | `--color-base-white` / `--color-base-black` | unchanged   | literal, not themed                         |

7. **ChangeTheme → ChangeThemeIconButton.** Same behavior (dispatches toggle,
   shows moon in light / sun in dark). The `div[data-fsd]` wrapper stays
   (IconButton doesn't forward arbitrary DOM props). A story is added next to
   the component; it is live: clicks dispatch into the Storybook store, the
   moon/sun glyph follows the theme global.

## Testing decisions

- The seam is the DOM attribute + store state: "store Theme X ⇒
  `data-theme=X`". No new test seam is introduced; the behavior is verified
  visually in Storybook (token table via the theme global) and, if a regression
  ever appears, by a unit test around the sync function using the existing
  `makeStore({ persisted: false })` harness (prior art: session token sync).
- Dark token correctness is a design review task: eyeball Button, IconButton,
  ProductCard, Modal, LayoutBanner, Price, Text, DropdownMenu stories in both
  themes — these cover every overridden token.

## Out of scope

- Redesigning dark values in Figma / moving the variable collection to a paid
  plan.
- System-theme reactivity (listening to `prefers-color-scheme` changes at
  runtime) — only initial state uses `matchMedia`.
- Renaming or reshaping the theme slice actions.
- Domain glossary: the **Theme** term already exists in CONTEXT.md and stays as
  written.

## Further notes

- Decision 1 is a local design decision (reversible), so no ADR: the
  rehydration-bypass rationale already lives next to the access-token sync
  comment in the app entry.
- The FOUC behavior is unchanged: the attribute is set on mount, as before.
