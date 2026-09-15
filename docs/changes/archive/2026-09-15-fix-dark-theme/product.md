# fix-dark-theme — product spec

## Problem Statement

The dark Theme is partially broken: the Icon component cheats with `filter: invert(1)`
instead of relying on tokens, only 4 of ~18 color tokens have dark values (the rest
stay light), and the theme application mechanism (ThemeProvider) is a React-side
side effect that duplicates state ownership that already lives in Redux.

## Solution

Dark Theme works entirely through color tokens: every color token has a dark
override, icons are painted by `currentColor`, and applying the Theme to the
document is a store-level effect. The theme switch control is renamed to reflect
its actual UI (IconButton-based). No Figma involvement: the free plan can't
maintain variable collections, so dark values are hand-picked and verified
visually in Storybook.

## User Stories

1. As a site visitor, I want every colored surface (text, backgrounds, buttons,
   modals, cards, banner) to be readable in the dark Theme, so that the UI looks
   coherent instead of half-light.
2. As a site visitor, I want icons to follow the text color in both Themes, so
   that they are visible without an artificial filter.
3. As a site visitor, I want my Theme choice to persist across reloads, so that
   I don't have to re-toggle it.
4. As a site visitor with OS dark mode enabled, I want the app to start in the
   dark Theme, so that it matches my expectation by default.
5. As a developer working in Storybook, I want to flip the global Theme and see
   every tokenized surface adapt, so that I can verify dark values visually.
6. As a developer, I want the theme switch control exposed in Storybook, so that
   I can develop and regression-check it in isolation.
7. As a product owner, I want the `darkMode` feature flag to mean "show the
   switch control" only, so that theme rendering is never secretly gated behind
   a flag.

## Behavioral scenarios

- Given the store Theme is `dark`, when any page renders, then
  `html[data-theme='dark']` is set and all color tokens resolve to their dark
  values.
- Given the Theme was persisted as `dark` and the page reloads, then
  `data-theme='dark'` is applied on startup (rehydration bypasses middleware, so
  the sync mechanism must not rely on it).
- Given the `darkMode` flag is off, when the app renders, then the Theme is still
  applied but the switch control is not shown.
- Given the Storybook theme global is `dark`, when a story renders, then the
  wrapper shows dark tokens (and the ChangeThemeIconButton story shows the sun
  icon, i.e. "switch to light" affordance).
