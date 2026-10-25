---
status: needs-triage
---

# Button spinner integration

Feature: replace the textual loading indicator in Button with the rotating
loader icon, per the design system.

## Context

- During the figma-integration grilling session (2026-09-09) the decision was to
  implement Button loading state as the Figma drawing does today: static `...`
  text plus 0.3 opacity.
- Figma already has a dedicated loader component (`Type=Loading` icon,
  node 45:3599 in nukeapp-uikit), but it is not instantiated inside the Button
  component set.
- The old implementation (rotating `Icon type="loader"`) is preserved in git
  history of `src/shared/ui/Button/`.

## Scope

- Instantiate the loader icon in the Figma Button loading variants (designer
  side) or agree the icon stays code-side only
- Swap `...` text in `Button.tsx` for the rotating loader icon
- Keep the 0.3 opacity loading treatment from Figma
- Record the loading-state mapping in `Button.figma.yml` once the mapping layer
  lands
