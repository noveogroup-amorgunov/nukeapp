# Workflow: Figma component synchronization

## Goal

Synchronize one Figma component with the correct production React component by
updating two distinct artifacts:

1. the **central registry** (`.design-system/figma-registry.yml`) for
   identity/code resolution;
2. the optional colocated **`*.figma.yml`** for non-trivial property/state/API
   translation.

This workflow may create or modify production components when necessary.

## Inputs

- a Figma component, component set, or node accessible through Figma Bridge MCP;
- the repository, its central registry, and its architecture rules.

## Procedure

### 1. Inspect the Figma component

Use Figma Bridge MCP to determine:

- component/component-set node id and human-readable name;
- variants and component properties;
- text, boolean and instance-swap properties;
- nested component instances and image-fill overrides;
- visual states, layout behavior;
- tokens/variables used by the component.

Do not infer code ownership, FSD placement, or the public React API from Figma
naming alone.

### 2. Resolve the existing registry entry

Look up the component's **node id** in the central registry.

**A. Entry exists** — treat its production component/import as the intended
mapping unless repository evidence shows it is stale.

**B. Entry is missing** — search the repository for the correct production
component before creating anything: by semantic purpose, UI-kit exports,
feature/page-local components, existing `*.figma.yml` files. Do not create a
duplicate component solely because Figma and code use different names.

### 3. Decide architecture on the code side

If the entry is missing or stale, decide the correct production ownership:

```text
Button                         -> shared/ui/Button
DeliverySlotRow                -> features/delivery/ui/DeliverySlotRow
OrderSummaryCard for Checkout  -> pages/checkout/ui/OrderSummaryCard
Header                         -> widgets/header/ui/Header
```

Do not derive this from Figma path/name conventions such as `Page/Login/...`.
Reusability does not imply design-system scope.

### 4. Create or update the registry entry

```yaml
"1:223":
  figmaName: "Button"
  component: Button
  import: "@/shared/ui/Button"
  mapping: "src/shared/ui/Button/Button.figma.yml"
```

The registry owns identity/import resolution only — no per-property mappings,
no visual tokens, no state transformations.

### 5. Compare Figma API to code API

Classify every meaningful Figma property/state as one of:

- React prop (possibly with value transformation);
- content/children;
- CSS/pseudo-state;
- image-fill/content override;
- layout-only/presentation-only;
- nested mapped component;
- ignored implementation detail.

```text
Figma State=Hovered      -> CSS :hover
Figma FocusVisible       -> CSS :focus-visible
Figma Disabled=true      -> React disabled
Figma Loading=true       -> React isLoading
Figma Variant=Primary    -> React variant="primary"
Figma Title              -> React children or title prop
```

### 6. Decide whether code changes are needed

- **A. Component matches** — update only the registry and/or mapping.
- **B. Semantically correct, API differs** — prefer mapping transformations
  over changing the public API merely to resemble Figma.
- **C. Component lacks a legitimate semantic capability** — update the
  component API and implementation, then tests/stories/mapping.
- **D. No component exists** — create it in the architecturally correct scope,
  then register it. Do not automatically place new components into the UI kit.

### 7. Create/update the colocated `*.figma.yml` only when useful

Use the schema in `mapping-format.md`. Include only information that cannot be
safely inferred from the production component or the registry; never repeat
registry data (node id, name, import path, scope). If Figma and React APIs
align trivially, no mapping file is necessary.

### 8. Validate tokens

When Figma uses variables, map them 1:1 to CSS custom properties by joining
path segments with dashes (`--color/bg/brand` → `--color-bg-brand`). Do not
copy literal values when an equivalent token exists; flag missing semantic
tokens instead of silently hardcoding literals. Do not invent token names.

### 9. Validate implementation

Check as applicable: TypeScript types, lint, tests, stories, exports/import
path, registry path validity, mapping path validity. Interaction states must
be CSS selectors, not fake props.

### 10. Report result

Summarize: Figma node id/name; registry entry created/updated; production
component used/created and why at that location; mapping file created/updated;
code API changes; unresolved mismatches.

## Guardrails

- Never derive FSD layer/slice placement from Figma naming alone.
- Never let Figma become the source of truth for code architecture.
- Never introduce `state="hover"`-style runtime props because Figma has those
  variants.
- Never create raw duplicates of existing UI-kit or local components.
- Never promote page-local components to the design system without an
  architectural reason.
- Do not treat Figma layer names as stable identity — the node id is.
- Keep the central registry architectural and minimal; keep local mappings
  API-focused and colocated.
