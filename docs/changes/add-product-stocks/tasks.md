# Tasks — add-product-stocks

Persistent execution state: work resumes from the first unchecked item.
Spec: `product.md` (WHY + WHAT), `technical.md` (HOW).

## 1. Out of stock end-to-end

- [x] Replace `inStock: boolean` with `stock: number` in the product DTO and
      mock data
- [x] Add `stock: number` to the domain `Product` type and the product
      mapping; mirror it through the ProductDetails DTO → details → product
      transforms
- [x] Catalog card: when Stock = 0, show "Out of stock" instead of the price
      and render the card at 50% opacity (card stays clickable, wishlist
      keeps working)
- [x] Product page: when Stock = 0, do not render the add-to-cart control

Blocked by: none (can start immediately)

## 2. «Only 1 left» badge

- [x] Extract a reusable availability-info UI component in the product entity
- [x] Show a "Only 1 left" badge on the catalog card and the product page,
      strictly when Stock = 1; no stock number otherwise

Blocked by: 1

## 3. Limit Quantity by Stock

- [x] Guard in `addCartProductThunk`: if cart Quantity for the product equals
      its Stock, return without dispatching `addOneItem`, `incVersion` or
      cart sync
- [x] Full-size `AddToCartButton` (product page): dim the "+" action and show
      a "No more" hint when Quantity = Stock > 0; compact cart stepper stays
      unchanged ("+" becomes a no-op)

Blocked by: 1 (independent of 2)

## 4. Verify and update current-state docs

- [ ] Run the lint suite (eslint, tsc, steiger, dependency-cruiser)
- [ ] Manually walk through the behavioral scenarios in `product.md`
- [ ] Update `docs/product.md`: product availability + cart quantity limits

Blocked by: 1, 2, 3
