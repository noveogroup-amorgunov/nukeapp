# Product card integration: adopt V2 components in app code

## Problem Statement

The uikit-sync change (`product-card-components`, archived) produced
presentation-only `ProductCardV2`, `ProductGrid`, `CartProductListV2`
(+ internal `CartProductCardV2`), `AddToCartButtonV2`, `Price` and `LogoV2`,
but no page uses them: the app still renders catalog, wishlist, cart, product
details and header with legacy smart components whose visuals diverge from the
Figma uikit and whose business logic is locked inside the components.

## Solution

Compose the new presentation-only components from outside — at page level,
following the sibling-project conventions (frontend-lite): pages own redux,
routing, modals and view-model mapping; shared/ui components only receive
view models and `onXxx` callbacks. Legacy counterparts that nothing references
anymore are removed. After that a separate commit drops the transitional `V2`
suffixes so production names match the Figma component names (per ADR-0002).

## User Stories

1. As a shopper, I want catalog and wishlist cards to look exactly like the
   Figma product card, so that the shop feels like the designed product.
2. As a shopper, I want the quantity of a product already in my cart shown as
   a badge on catalog cards, so that I see what I already own at a glance.
3. As a shopper, I want the cart rendered as Figma cart lines with unit
   price, line total and a stepper, so that I can adjust quantities in place.
4. As a shopper, I want to remove a cart line or toggle its wishlist status
   from the line's action slot, so that line management stays in one place.
5. As an anonymous shopper, I want to be offered login when I try to change
   the cart on the product page, so that I understand why the action failed.
6. As an authorized shopper, I want a confirmation that the product was added
   to the bag with a shortcut to view the bag, so that I can proceed to
   checkout quickly.
7. As a shopper, I want prices everywhere (cards, cart lines, product
   details) rendered by one `Price` component, so that price display is
   consistent across the shop.
8. As a shopper, I want the header logo to match the uikit logo, so that the
   brand is presented as designed.
9. As a UI developer, I want all new components to be free of redux, routing
   and modal logic, so that business behavior is composed once at page level.
10. As a UI developer, I want one view-model mapper per page slice, so that
    entity models never leak into shared/ui components.
11. As a maintainer, I want superseded legacy components deleted, so that the
    codebase has a single implementation per UI concern.
12. As a design-to-code agent, I want production component names to equal
    Figma component names (no `V2` suffixes), so that registry resolution
    stays unambiguous per ADR-0002.

## Behavioral scenarios

### Catalog / wishlist / main grids

- Given a category page, When products resolve, Then they render as a
  `ProductGrid` with auto columns and every card shows specification, name,
  `Price` (old price struck-through), low-stock badge and sold-out overlay.
- Given a product has Quantity > 0 in the cart, When its card renders, Then
  the quantity badge is shown on the image overlay.
- Given a click on any part of a card, When `onProductClick` is set, Then the
  page navigates to the product page.
- Given the wishlist page, When authorized, Then the list renders as a
  `ProductGrid` whose per-card action slot holds the wishlist toggle icon.
- Given the wishlist page is fetching or empty, When it renders, Then the
  page-level loading/empty states appear exactly as today (lists only render
  products).
- Given the main page "Featured products" section, When products resolve,
  Then they render as a `ProductGrid` (auto columns).

### Cart page

- Given a cart with lines, When it renders, Then each line shows image,
  specification, name, unit `Price` (Size L), "Total price:" with the line
  total (Quantity × price, struck-through Quantity × oldPrice), the stepper
  and the action slot.
- Given a stepper increase/decrease, When invoked, Then the page dispatches
  the corresponding cart thunk for that Product.
- Given Quantity >= Stock on a line, When the stepper renders, Then the plus
  action is disabled (MaxAdded) and increase is not dispatched.
- Given the action slot, When rendered, Then it contains the wishlist toggle
  icon and the remove icon (confirm modal included) — composed by the page.
- Given a click on the product area of a line, When `onProductClick` is set,
  Then the page navigates to the product page.
- Given an empty or unauthorized cart, When the page renders, Then the
  existing page-level login/empty states are unchanged.

### Product details

- Given a product with Stock > 0, When the actions row renders, Then it shows
  the wishlist button and `AddToCartButtonV2` (Size L) whose Empty state shows
  `Price` (old price struck-through) and whose container click increases.
- Given the product is already in the cart, When the stepper renders, Then it
  shows minus / Quantity / plus.
- Given Quantity >= Stock, When the stepper renders, Then the plus action is
  disabled; the page does not dispatch.
- Given an anonymous shopper clicks increase, When handled at page level,
  Then the login confirm modal appears; confirming navigates to login with
  `returnUrl` back to the product page.
- Given an authorized shopper increases on the details page, When handled,
  Then the add thunk dispatches and the "was added to bag" alert modal with
  "View bag (n)" appears (as today).
- Given Stock = 0, When the details page renders, Then the add-to-cart
  control is not rendered (as today) and the stock hint renders instead of a
  buyable price.
- Given any Stock state, When the price area renders, Then it is a `Price`
  instance (old price struck-through); "Only 1 left" is kept as a page-level
  badge.

### Header

- Given any route, When the header renders, Then the uikit logo is shown and
  clicking it navigates home (Link composed by the widget, `LogoV2` stays
  router-free).

### Rename commit

- Given all usages renamed, When the registry resolves a Figma component,
  Then production names have no `V2` suffixes (`ProductCard`, `ProductGrid`,
  `CartProductList`, `CartProductCard`, `AddToCartButton`, `Logo`) and the
  Figma names were unchanged.
