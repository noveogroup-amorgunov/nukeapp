# Figma registry and `*.figma.yml` mapping formats

This project uses a project-owned alternative to official Figma Code Connect
for workflows using Figma Bridge MCP. Rationale: `docs/adr/0002-figma-integration-registry-and-mappings.md`.

There are **two separate artifacts**. Keep their responsibilities distinct.

---

# 1. Central registry — `.design-system/figma-registry.yml`

## Purpose

The registry maps stable Figma identity to production code identity.

It answers:

> Which production component should be used for this Figma component?

## Schema

```yaml
version: 1

components:
  "1:223":
    figmaName: "Button"
    component: Button
    import: "@/shared/ui/Button"
    mapping: "src/shared/ui/Button/Button.figma.yml"

  "3:47":
    figmaName: "ProductCard"
    component: ProductCard
    import: "@/entities/product/ui/ProductCard"
```

- The key is the **Figma node ID** of the component/component set.
- `mapping` is optional; omit it when no colocated mapping is needed.

## Registry rules

1. Use the Figma node ID as the primary key.
2. `figmaName` is readable metadata only; it does not determine code location.
3. `component` and `import` are authoritative for code resolution.
4. `mapping` points to the colocated API mapping when one is needed.
5. Do not store property mappings, visual tokens, layout details, state
   transformations, or component documentation in the registry.
6. Renaming a Figma component must not change code architecture while its
   node ID remains stable.
7. The registry is never imported by runtime code; validate entry paths with
   file-existence checks.

---

# 2. Colocated `*.figma.yml`

## Purpose

The local mapping is an adapter between a Figma component's design-time API and
the existing production React API.

It answers:

> How should Figma properties/states/content overrides be translated when using
> this production component?

It lives next to the component:

```text
src/shared/ui/Button/
  Button.tsx
  Button.figma.yml
```

Notice what is intentionally absent from the local mapping:

```text
node id
figma name
scope
owner
code component name
import path
```

Those responsibilities belong to the central registry / code architecture.

## Base schema

```yaml
version: 1

properties:
  Variant:
    type: prop
    prop: variant
    values:
      Primary: primary
      Secondary: secondary

  Disabled:
    type: boolean-prop
    prop: disabled

  Loading:
    type: boolean-prop
    prop: isLoading

  Label:
    type: text
    code:
      target: children

  InteractionState:
    type: presentation-only
    values:
      Hovered: ":hover"
      Pressed: ":active"
      FocusVisible: ":focus-visible"
```

## When no local mapping is needed

Do not create a `*.figma.yml` merely for completeness. If the registry resolves
a component and Figma properties already align trivially with its real
TypeScript API, the registry entry may omit `mapping` entirely. Create a local
mapping when translation is non-trivial or when the agent would otherwise have
to guess.

## Image-fill example

```yaml
properties:
  Image:
    figma:
      type: image-fill
      layer: BackgroundImage
    code:
      prop: image
```

The Figma editor exposes the image through an instance Fill override while the
React component uses an ordinary prop. Do not convert every content image into
a Figma component just to make Instance Swap available.

## Layout-semantic example

Use only when Figma's internal layout differs materially from the intended code
behavior (Figma Slots cannot use Grid, so a grid may be drawn as wrap):

```yaml
layout:
  figma:
    type: horizontal-wrap
  code:
    type: css-grid
    columns: 3
    itemSizing: 1fr
```

## Property types

```text
prop               Figma value -> React prop
boolean-prop       Figma boolean -> React boolean prop
text               text property/content
presentation-only  visual/editor state; do not generate a runtime prop
```

For exceptional cases use nested `figma` / `code` descriptions rather than
inventing new generic property types.

---

# Resolution algorithm

When implementing from Figma:

```text
1. Read the Figma instance's main component node id
2. Look up the node id in the central registry
3. Resolve production component/import
4. If the entry has `mapping`, load the colocated *.figma.yml
5. Translate non-trivial Figma properties/states through that mapping
6. Use the real production component
```

If step 2 fails, do not infer FSD placement from the Figma name — run the
component synchronization workflow (see `component-sync.md`).

If step 4 has no mapping, inspect the real production TypeScript API. Proceed
only when the translation is unambiguous; otherwise surface the missing
mapping.

Do not confuse this format with official Figma Code Connect `.figma.ts` files.
If the project later adopts Code Connect, the registry and mappings can serve
as migration input, but Code Connect is a separate integration.
