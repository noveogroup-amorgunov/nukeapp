# fix-dark-theme — tasks

Tracer-bullet slices; work resumes from the first unchecked item.

## 1. Dark tokens for every color token + drop the Icon invert crutch

**Blocked by:** none (can start immediately)

**Delivers:** dark Theme renders coherently across all tokenized surfaces;
icons follow the text color without a filter. Demoable in Storybook by
flipping the theme global.

- [x] Add dark overrides for all color tokens in the token stylesheet per the
      mapping table in technical.md (decision 6)
- [x] Remove `filter: invert(1)` from the Icon dark-theme rule (decision 5)
- [x] Visual pass in Storybook over Button, IconButton, ProductCard, Modal,
      LayoutBanner, Price, Text, DropdownMenu in both themes; adjust values
      that look off and update the table in technical.md if changed
      (done by the product owner: brand tokens kept light, white content on
      brand surfaces, IconButton/debug-toggler follow-ups)

## 2. Theme application as a store-level effect; ThemeProvider deleted

**Blocked by:** none (can start immediately)

**Delivers:** `data-theme` on `html` always matches the store Theme — including
the persisted Theme after reload — with no React provider involved; the flag
gates only the switch control.

- [x] Add the DOM sync (set attribute from currentTheme) as a store effect:
      initial call + store subscription, mirroring the access-token sync in the
      app entry; the store itself performs the sync so Storybook stores get it
      too (decision 4)
- [x] Remove the ThemeProvider component, its usage in the app entry and in the
      `withTheme` decorator; delete the now-unused featureToggle `@x` module
      (decisions 1, 3)
- [x] `withTheme` decorator dispatches toggle to the exported storybook store
      when the store theme differs from the theme global (decision 4)
- [x] Remove the `!darkModeIsEnabled` gate from the theme sync; verify reload
      with a persisted dark Theme still applies dark (decision 2)

## 3. ChangeTheme → ChangeThemeIconButton + story

**Blocked by:** 2

**Delivers:** the switch control is renamed to what it is (IconButton) and has
a Storybook story; clicks dispatch toggle, glyph follows the theme global.

- [x] Rename the component and its file to ChangeThemeIconButton; keep the
      `div[data-fsd]` wrapper and update the data-fsd value; update the barrel
      export and the layout header icons import (decision 7)
- [x] Add a live story next to the component: moon in light, sun in dark,
      click toggles the Theme through the Storybook store
