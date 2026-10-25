---
status: needs-triage
---

# Radius design tokens

Feature: introduce radius design tokens so corner radii are not hardcoded
literals.

## Context

- During the figma-integration grilling session (2026-09-09) the decision was to
  keep `border-radius: 32px` on Button as a literal: the Figma variable
  collection (`nukeapp-uikit`) has color, spacing and size variables but no
  radius variables.
- The token naming convention agreed in the session: Figma variable name with
  slashes replaced by dashes (e.g. `--color/bg/brand` → `--color-bg-brand`),
  so a future Figma `--radius/*` group maps to `--radius-*`.

## Scope

- Designer side: create a radius variable group in the Figma collection and
  apply it to components (Button 32, IconBadge, Modal, ProductCard, ...)
- Code side: add matching `--radius-*` CSS custom properties and replace
  radius literals in components
