# Workflow: Figma design to React

## Goal

Implement a Figma frame/view in React by resolving component instances through
the central registry, applying optional colocated API mappings, and composing
the mapped production components.

This workflow is conservative about changing the UI kit, architecture,
registry, or mapped components. When such a change is necessary, switch to the
component synchronization workflow (see `component-sync.md`) first.

## Inputs

- Figma frame/view accessible through Figma Bridge MCP;
- repository, central registry (`.design-system/figma-registry.yml`), optional
  colocated `*.figma.yml` mappings;
- project architecture and coding conventions.

## Procedure

### 1. Inspect the target frame

Use Figma Bridge MCP to understand: hierarchy and meaningful regions; component
instances and their main component node ids; component properties/variants;
repeated structures; layout relationships and responsive intent;
spacing/sizing/tokens; text and image content; overlays/states where relevant.

Read enough context to understand semantics, not just pixel values.

### 2. Resolve every mapped Figma component through the registry

For each meaningful instance:

1. identify its main component's **node id**;
2. look it up in the central registry;
3. resolve the production `component` and `import`;
4. load the referenced `*.figma.yml` when one exists;
5. transform Figma properties according to the mapping;
6. use the production component rather than recreating its visuals.

Example:

```text
Figma instance: main component node id 1:223
  Variant=Primary, InteractionState=Hovered, Disabled=false

registry: 1:223 -> @/shared/ui/Button :: Button, mapping -> Button.figma.yml

result: <Button variant="primary" />   // Hovered is CSS-owned
```

Do not infer import paths or FSD placement from the Figma component name.

### 3. Treat local components exactly like UI-kit components

The registry may resolve to any architectural layer:

```text
node A -> @/shared/ui/Button
node B -> @/features/cart/ui/AddToCart
node C -> @/pages/checkout/ui/OrderSummary
```

Mapped page/feature-local components are first-class dependencies; do not
flatten them into arbitrary markup.

### 4. Handle missing registry entries explicitly

If an instance represents a reusable/local component whose node id is absent
from the registry:

- search the repository for a semantically equivalent component;
- do not guess architectural ownership from the Figma name;
- do not silently choose an import path;
- report the missing mapping and run/suggest component synchronization when the
  task allows it.

Diagnostic:

```text
UNRESOLVED FIGMA COMPONENT
Name: PromoCard
Node id: 12:345
Reason: no central registry entry
Suggested action: run Figma component synchronization
```

### 5. Handle missing local `*.figma.yml`

A missing mapping is not automatically an error. If the production API and
Figma properties map trivially and safely, use the component directly.
If the translation is ambiguous or non-trivial, stop guessing and surface the
missing mapping. Examples that usually require explicit mapping:

- `InteractionState=Hovered` vs CSS `:hover`;
- Figma `Medium` vs code `size="m"`;
- image Fill override vs React `image` prop;
- Figma Slot/wrap layout vs CSS Grid semantics.

### 6. Implement page composition

Compose the page/feature view from resolved production components. Add raw
HTML/layout wrappers only for structures that are genuinely page composition
rather than registered reusable components. Prefer semantic markup and project
conventions.

Render every text block through the `Text` component with the variant matching
the Figma text style (font size/weight/line-height pick the variant). When no
variant matches, style it in the CSS module like the mapped components do and
note the gap in the `*.figma.yml` — same treatment as a missing token.

### 7. Translate layout semantically

Do not mechanically translate Figma Auto Layout to `display:flex` or Figma
Grid to CSS Grid without considering intended behavior:

- a Figma Slot may use horizontal + wrap because Slot frames cannot use Grid;
  runtime may still use CSS Grid;
- a 2-column mosaic with a featured card spanning 2 rows is naturally
  `grid-row: span 2`;
- absolute positioning in Figma does not imply absolute positioning in code.

Use the simplest runtime layout matching the intended behavior.

### 8. Use tokens, not copied literals

Map Figma variables 1:1 to CSS custom properties by joining path segments with
dashes (`--color/bg/brand` → `--color-bg-brand`, `--spacing/08` →
`--spacing-08`). Use literals only for one-off values the design intentionally
contains. Do not invent token names without repository evidence; flag missing
tokens instead of silently hardcoding repeated literals.

### 9. Images

Treat arbitrary Figma image-fill overrides as content images, not component
instances. Use the local mapping/component API to determine whether code
expects `src`, `image`, `media`, `children`, or `backgroundImage`. Do not model
image-fill mechanics literally in React unless that is the production API.

### 10. Interactive states

For presentation states (Hover, Pressed, FocusVisible) prefer existing
component CSS/runtime behavior. For semantic states (Disabled, Loading, Error,
Selected) use mapped props/state when defined.

### 11. Validate

Run repository-standard checks as applicable: typecheck, lint, tests, build.
If screenshots/preview tooling is available, compare the implemented result
with the Figma target and fix material discrepancies without bypassing
registered components.

## Permissions / boundaries

By default this workflow may:

- read the registry and colocated mappings;
- read mapped UI-kit/local components;
- create/update page/feature view code and page-specific layout styles;
- use existing tokens/components.

By default it should NOT:

- decide new architectural ownership for unmapped Figma components;
- mutate the central registry opportunistically;
- redesign public UI-kit APIs or create duplicate UI-kit primitives;
- rewrite local mappings opportunistically;
- add runtime props for Figma-only visual states.

When such a change is necessary, run the component synchronization workflow
first.
