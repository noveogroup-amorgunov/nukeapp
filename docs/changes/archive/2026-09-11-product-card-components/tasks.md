# Tasks

Execution checklist (state resumes from the first unchecked item).
Each task is a tracer-bullet slice, demoable via Storybook, and carries its
own sync-workflow steps (registry entry, API mapping, barrel export) per
ADR-0002. Spec: `product.md` + `technical.md` in this directory.

## 01. Uikit base syncs: icons, Button height, IconButton ghost

Icons `minus`/`plus` added to Icon; Button fixed at 48px on all variants via
`--size-48`; IconButton gains `variant?: 'default' | 'ghost'`.
Blocked by: none.

- [x] Icon renders `minus` and `plus` matching Figma (`Type=Minus`/`Plus`)
- [x] Button renders at exactly 48px height on every variant (padding 12/16
      unchanged); stories updated
- [x] IconButton renders Ghost visuals per Figma; default variant unchanged;
      mapping updated; story covers both variants

## 02. Price component

Standalone price display with size/variant/old-price options.
Blocked by: none.

- [x] `Price` renders all Figma variant combinations (OldPrice × Size M/L ×
      Variant Primary/Secondary); old price struck-through before actual
- [x] Registry entry + API mapping (Figma `Variant` → `variant`) in place
- [x] Story enumerates all 8 combinations; barrel export added

## 03. AddToCartButtonV2 component

Presentation-only stepper with derived states; business logic stays out.
Blocked by: 01, 02.

- [x] Renders Empty (price + plus; container click = increase), InCart
      (minus / quantity / plus), MaxAdded (plus disabled) per Figma variants
- [x] Sizes M (32px) and L (48px); interaction states via CSS; disabled
      supported; `maxQuantityIsReached` blocks onIncrease
- [x] Composes `Price` and `Icon` internally; registry entry + mapping +
      story; barrel export

## 04. CartProductCardV2 (internal card)

Cart line card: image, specification, name, unit Price, line total, composed
stepper, Actions slot.
Blocked by: 02, 03.

- [x] Card renders per Figma `CartProductListCard`: info column, unit `Price`
      (Size L), "Total price:" + total (quantity × price, struck-through
      quantity × oldPrice), composed `AddToCartButtonV2` (Size M),
      `actions` slot contents over the image top-right; card-level
      FocusVisible ring and Pressed scale via CSS
- [x] Not exported from the shared UI barrel; own story exists

## 05. CartProductListV2 (virtualized list)

Scrollable list of cart lines with virtualization and hoisted callbacks.
Blocked by: 04.

- [x] Renders lines with window virtualization (`@tanstack/react-virtual`,
      12px gap, dynamic measurement); long lists scroll performantly
- [x] `CartLineView` view model (reuses `ProductCompactView`);
      `onIncrease`/`onDecrease`/`onProductClick` hoisted
      to list level; `actions` render-prop fills card slots
- [x] Registry entry + mapping + story (multiple lines with varied
      quantities, old prices and actions); barrel
      export; all acceptance criteria of the change verified (lint gates
      green: tsc, eslint, steiger, dependency-cruiser)

## 06. LogoV2 component

Figma logo as code.
Blocked by: none.

- [x] SVG exported from Figma (universal for both color themes), colocated
      with the component, imported via svgr `?react`
- [x] Pure-visual component (no router dependency); registry entry + story +
      barrel export; existing widgets-layer Logo untouched

## 07. ProductCardV2: Price adoption + interaction states

Existing card brought up to the current Figma composition.
Blocked by: 02.

- [x] Price line uses `Price` (Size M); `oldPrice` rendered struck-through
      (absorbs the former standalone old-price item); TODO comment removed
- [x] FocusVisible / Pressed states via CSS pseudo-classes per Figma
      variants (`100:1104`, `100:1114`); story covers new states and
      old-price rendering
- [x] `ProductCompactView` unchanged (oldPrice stays optional in the view
      model); no page/feature code touched
