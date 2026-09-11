# Product card components (V2): sync from Figma uikit

## Problem Statement

The Figma uikit has evolved past the production code: the cart product card
family, price display, add-to-cart stepper and logo exist only in Figma. The
app still renders the cart with legacy page-level components whose visuals
diverge from the uikit, and the design-to-code workflow (ADR-0002) has no
production components to map the new Figma components onto.

## Solution

Sync the full product card family from the Figma uikit into `shared/ui` as
presentation-only components, plus small uikit actualizations (icons, Button
height, IconButton ghost variant, ProductCardV2 interaction states). After
this change every component on the UIKIT page has a production counterpart
registered in the Figma registry, ready to be wired into pages by the
follow-up integration change.

## User Stories

1. As a UI developer, I want a `Price` component with size/variant/old-price
   options, so that every price display in the app renders consistently from
   one source.
2. As a UI developer, I want an `AddToCartButtonV2` that derives its visual
   state (Empty / InCart / MaxAdded) from quantity inputs, so that I never
   hand-assemble stepper visuals.
3. As a UI developer, I want a `CartProductListV2` that renders cart lines
   with built-in virtualization, so that long carts scroll performantly
   without page-level machinery.
4. As a UI developer, I want the cart card to compose the stepper and expose
   an actions slot, so that per-line business behavior attaches at one seam
   (the list callbacks), not per card.
5. As a UI developer, I want a `LogoV2` component from the exported SVG, so
   that the header logo matches the uikit without hand-drawn CSS hacks.
6. As a UI developer, I want the missing uikit icons (`minus`, `plus`) and
   the 48px Button height and IconButton ghost variant, so that the product
   card family can be composed without one-off styling.
7. As a design-to-code agent, I want registry entries and API mappings for
   every new component, so that Figma instances resolve to production code
   per ADR-0002.
8. As an integrator (next change), I want all new components to be free of
   business logic and entities-layer dependencies, so that wiring redux,
   auth and routing happens only in features/pages.
9. As a maintainer, I want stories enumerating every Figma variant
   combination, so that visual regressions surface before integration.

## Behavioral scenarios

### Price

- Given `oldPrice` is provided, When Price renders, Then the old price is
  shown struck through before the actual price.
- Given no `oldPrice`, When Price renders, Then only the actual price shows.
- Given `size` M vs L, When Price renders, Then the Figma-mapped text styles
  apply (M: 16px semibold line 18; L: 24px bold line 30).
- Given `variant` secondary, When Price renders, Then the brand color is
  used; primary (default) uses the primary text color.

### AddToCartButtonV2

- Given `quantity` is 0, When rendered, Then the Empty state shows the price
  (with struck-through old price when provided) plus a plus action; clicking
  the whole container triggers `onIncrease`.
- Given `quantity` > 0, When rendered, Then the InCart stepper shows minus
  action, quantity numeral, plus action.
- Given `maxQuantityIsReached`, When rendered, Then the plus action is
  disabled (MaxAdded visual); `onIncrease` is not invoked.
- Given `disabled`, When rendered, Then neither action triggers.
- Given `size` L, When rendered, Then the control is 48px tall (M: 32px).

### CartProductListV2 / CartProductCardV2

- Given a list of cart lines, When rendered, Then each line shows image,
  specification, product name, unit `Price`, "Total price:" with the line
  total (quantity × price, struck-through quantity × oldPrice), the composed
  stepper and the contents of the `actions` slot.
- Given a long list, When scrolled, Then only visible cards are rendered
  (window virtualizer, 12px gap).
- Given a click on a card, When `onProductClick` is set, Then it is invoked
  with the product id.

### Uikit updates

- Given the new icon types, When `Icon` renders with `minus`/`plus`, Then
  visuals match Figma (`ShoppingCart` keeps mapping to the existing local
  `bag` asset).
- Given any Button, When rendered, Then its height is exactly 48px on all
  variants.
- Given IconButton with `variant="ghost"`, When rendered, Then visuals match
  the Figma Ghost variants; default variant unchanged.
- Given ProductCardV2, When pressed/focus-visible, Then the card reflects
  the corresponding Figma interaction state via CSS only (the Figma card set
  has no Hovered variant).
- Given ProductCardV2 with a product carrying `oldPrice`, When rendered,
  Then the price line is a `Price` instance: struck-through old price before
  the actual price (per the current Figma card composition).
