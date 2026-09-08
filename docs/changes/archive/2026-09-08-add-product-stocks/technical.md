# Product stocks — technical design

id: add-product-stocks

## Data model

- `ProductDto` and the mock product data replace the boolean `inStock` flag
  with a numeric `stock: number` field.
- The domain `Product` type gains `stock: number`; the product mapping passes
  it through. The ProductDetails widget mirrors the same field through its
  DTO → details → product transforms.
- `stock === 0` means out of stock (derived; no separate availability flag).

## Model guard

- `addCartProductThunk` checks via `getState` whether the current cart
  **Quantity** for the product already equals its **Stock**; if so, the thunk
  returns without dispatching `addOneItem` (no version bump, no sync).
  This is the single enforcement point — UI hints are cosmetic.
- The guard lives in the add-to-cart feature thunk (where cart entities are
  already imported); the cart slice stays unaware of stock.

## UI

- Availability display ("Out of stock", "Only 1 left" badge) is a small
  product-entity UI component rendering availability info for a `Product`,
  reused by the catalog card and the product page.
- The catalog card renders 50% opacity for out-of-stock products.
- `AddToCartButton`:
  - renders a disabled out-of-stock state (button not offered on the product
    page — the page simply omits it);
  - when Quantity = Stock > 0 and the full-size variant is shown: dims the
    "+" action and renders a "No more" hint; the compact cart stepper stays
    unchanged (the thunk guard makes "+" a no-op).
- Badge rule is shared: "Only 1 left" strictly when `stock === 1`, no stock
  number otherwise.

## Testing decisions

- The repository has no test runner or existing tests; no test seam is
  introduced by this change. Verification is `lint` (eslint, tsc, steiger,
  dependency-cruiser) plus manual walkthrough of the behavioral scenarios
  in `product.md`.
- The Given/When/Then scenarios in `product.md` are written to be directly
  translatable into tests if a runner is adopted later; the natural seam is
  the rendered product page / catalog with the mocked product API.

## Prior art / reference

- Draft implementation: PR #24 (`feature/product_stocks`) in
  noveogroup-amorgunov/nukeapp — reference only; decisions above (field
  naming `stock`, thunk guard, no `inStock`, badge rule) intentionally differ
  from the draft where noted.
