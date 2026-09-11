# Technical design

Follows the Figma component sync workflow (ADR-0002): central registry entry
per component + colocated API mapping. Figma owns visual intent; production
code owns runtime API. Interaction variants (Hover/Pressed/FocusVisible) map
to CSS pseudo-classes only — no runtime state props.

## Figma node map

| Figma set/component   | Node                                     | Production component                       |
| --------------------- | ---------------------------------------- | ------------------------------------------ |
| `ProductCard`         | `3:47`                                   | `ProductCardV2` (already synced)           |
| `ProductGrid`         | `7:421`                                  | `ProductGrid` (already synced)             |
| `CartProductList`     | `93:1823` (plain component, no variants) | `CartProductListV2`                        |
| `CartProductListCard` | `100:724`                                | `CartProductCardV2` (internal to the list) |
| `Price`               | `97:2009`                                | `Price`                                    |
| `AddToCartButton`     | `89:1209`                                | `AddToCartButtonV2`                        |
| `Logo`                | `101:1156`                               | `LogoV2`                                   |

`V2` prefixes/suffixes are code-side only (Figma has none) — they disambiguate
from legacy components that stay untouched in this change.

## New components

### Price

- Props: `price: Penny`, `oldPrice?: Penny`, `size?: 'm' | 'l'` (default
  `'m'`), `variant?: 'primary' | 'secondary'` (default `'primary'`).
- Old price: struck-through, rendered before the actual price.
- Visuals: M = 16px semibold / line 18; L = 24px bold / line 30.
  Secondary = brand purple; primary = `--color-text-primary`.
- Formatting via the shared money formatter.

### AddToCartButtonV2

Presentation-only (sibling-project ontology: `onIncrease`/`onDecrease`,
`maxQuantityIsReached`). No redux, no modals, no routing.

```ts
type Props = {
  quantity: number // 0 → Empty, >0 → InCart
  maxQuantityIsReached?: boolean // → MaxAdded (plus disabled)
  price: Penny
  oldPrice?: Penny // shown only in Empty state
  size?: 'm' | 'l' // default 'm' (32px); 'l' = 48px
  disabled?: boolean
  onIncrease: (event: React.MouseEvent) => void
  onDecrease: (event: React.MouseEvent) => void
}
```

- Composes `Price` and `Icon` (`minus`/`plus`) internally; Empty state shows
  price + plus action; whole container click = increase when Empty.
- States Empty/InCart/MaxAdded and interaction states are derived
  (quantity, flags, CSS) — never runtime props.

### CartProductListV2 + internal CartProductCardV2

```ts
type CartLineView = {
  product: ProductCompactView // the existing ProductCardV2 view-model type
  quantity: number
}

type Props = {
  lines: CartLineView[]
  onIncrease?: (productId: string) => void
  onDecrease?: (productId: string) => void
  onProductClick?: (productId: string) => void
  actions?: (line: CartLineView) => ReactNode // fills the Figma Actions slot
}
```

Note: the `CartProductListCard` Figma set has no `Size` property (only
Default/FocusVisible/Pressed) — the M/L sizes seen in the uikit belong to the
embedded `Price`/`AddToCartButton` instances, which the card sizes itself.

- Card composes `AddToCartButtonV2` directly (as in Figma); stepper callbacks
  are hoisted to list level, so integration attaches business behavior once.
- Card derives total: `quantity × price` (old: `quantity × oldPrice`,
  struck-through).
- Virtualization with `@tanstack/react-virtual` window virtualizer, 12px gap,
  dynamic item measurement (heights vary with text wrap).
- `CartProductCardV2` is not exported from the shared UI barrel; it gets its
  own story file regardless.
- The list itself decouples from the entities layer — same decoupled
  view-model precedent as `ProductCompactView`.

### LogoV2

- Pure-visual component (no router dependency; a Link wrapper belongs to the
  integration change). Single variant; universal for both color themes.
- SVG exported from Figma, colocated with the component, imported via svgr
  `?react`.
- The existing widgets-layer `Logo` stays untouched until integration.

## Uikit updates

- `Icon`: add `minus`, `plus` types (Figma `Type=Minus`/`Plus`);
  `ShoppingCart` stays mapped to the existing local `bag` asset.
- `Button`: fixed 48px height on all variants via the `--size-48` token;
  padding 12/16 unchanged. (Supersedes the earlier "auto sizing" sizing note
  from the original Button sync — Figma is the source of truth and now fixes
  48px.)
- `IconButton`: new `variant?: 'default' | 'ghost'`; visuals per Figma
  `Variant=Ghost`. Figma property is named `Variant` (renamed from `Theme` on
  2026-09-11), so no naming divergence in mappings.
- `ProductCardV2`: adopt `Price` for the price line (replacing the raw
  formatted-text line), render `oldPrice` struck-through per Figma (absorbs
  the intent of `.scratch/product-card-old-price/`), and add FocusVisible /
  Pressed interaction states via CSS pseudo-classes per Figma variants
  (`100:1104`, `100:1114`). The Figma card embeds a `Price` Size=M instance.

## Sync workflow steps (per ADR-0002)

1. Registry entry per new component keyed by node id from the table above.
2. Colocated API mapping per component (non-trivial translations: Price
   variant naming, AddToCartButtonV2 state derivation, card composition,
   LogoV2 asset).
3. Component + CSS module + story per component; barrel exports for public
   components only.

## Testing decisions

- No unit-test framework in the repo; the seam is **Storybook stories as the
  executable spec**: every story enumerates Figma variant combinations
  (Price 2×2×2, AddToCartButtonV2 states × sizes × interaction states,
  IconButton ghost, ProductCardV2 states, LogoV2, card/list sizes) and is
  visually checked against Figma screenshots.
- Automated gates: typecheck, eslint, steiger (FSD boundaries), and
  dependency-cruiser (no entities/features imports from shared).
- Callback behavior is exercised in stories via stateful playgrounds (no
  business logic to test inside components).

## Out of scope

- Wiring components into pages/features (follow-up integration change).
- Removing/modifying legacy `CartProductList` and the feature-level
  add-to-cart button.
- ProductCardV2 old-price rendering is IN scope (see uikit updates above;
  it absorbs the former standalone old-price item).
- Dark theme values; loading-spinner behavior (`.scratch/button-spinner/`);
  radius tokens (`.scratch/button-radius-tokens/`).
