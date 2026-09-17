# Technical design

Testing seam: no unit-test framework in this repo (consistent with prior
changes) — `lint:eslint`, `lint:types`, `lint:steiger`,
`lint:dependency-cruiser` and `build` assert nothing broke; behavioral
scenarios in `product.md` are verified visually on the dev server. No new
seams.

## Migration shape

```
src/entities/cart/
├── index.ts                      ← shrunk public API (thunks + selectors + reset + types)
├── lib/
│   └── mapCartLinesRequest.ts    ← request mapper, internal (not exported)
├── model/
│   ├── slice.ts                  ← unchanged behavior; raw actions become internal
│   ├── actions.ts                ← moved from features/cart/addToCart/model/actions.ts
│   │                                (thunks renamed; syncCart debounce absorbed;
│   │                                commitCartMutation concentrates the ritual)
│   └── types.ts                  ← CartItem renamed to CartLine per CONTEXT.md
│                                   (state field itemsMap kept — redux-remember
│                                   persistence shape untouched)

src/pages/cart/ui/RemoveIcon/     ← moved from features/cart/addToCart/ui/RemoveIcon
src/features/cart/                ← deleted entirely
```

- `entities/cart/model/actions.ts`: same three thunks, renamed —
  `addCartProductThunk` → `addProductToCart` (`Product`),
  `removeCartProductThunk` → `decrementProductQuantity` (`Product`,
  decrements Quantity by one; the old thunk carried a stale "fix naming" TODO),
  `removeCartItemThunk` → `removeCartLine` (`ProductId`, removes the cart line
  entirely; used by RemoveIcon on the cart page). The internal
  `updateCartThunk` and debounced `syncCart` stay unexported. The Stock guard
  stays inside `addProductToCart`. The per-thunk ritual
  `dispatch(reducer) → dispatch(incVersion) → syncCart` is extracted into
  `commitCartMutation` — the single place a cart mutation is committed.
- `entities/cart/index.ts` public API after the change:
  - new: `addProductToCart`, `decrementProductQuantity`, `removeCartLine`
  - kept: `selectProductInCart`, `selectTotalQuantity`, `selectCartTotalPrice`,
    `selectProductsInCart`, `selectCartQuantityByProductId`, `selectCart`,
    `resetCartData`, types `Cart` / `CartLine`
  - dropped: raw actions (`addOneItem`, `removeOneItem`, `incVersion`,
    `removeItem`-aliases incl. the former `removeProductFromCart` alias),
    `mapCartItemsRequest`, `cartSlice`
- `RemoveIcon`: same implementation (`useConfirmModal` from `shared/ui`),
  `data-fsd="page/cart/RemoveIcon"`, imports the thunk from `@/entities/cart`.
  It is page-internal — not re-exported through the page slice's public API
  (consumer `CartProductList` imports it relatively, per ADR-0005 rule 5
  analogy; it is a component, not a sub-slice).
- Consumers updated (import names only):
  - `pages/product/ui/ProductDetails/ProductDetails.tsx`:
    `addProductToCart`, `decrementProductQuantity`
  - `pages/cart/ui/CartProductList/CartProductList.tsx`:
    `addProductToCart`, `decrementProductQuantity` + local `RemoveIcon`
  - `features/session/logout/model/logout.ts`: `resetCartData` (unchanged)
- Slices' `data-fsd` and all CSS stay byte-identical.
- Follow-up renames (maintainer decision after the first review round):
  `removeProductFromCart` → `decrementProductQuantity` (the name now says
  what it does: decrements Quantity by one, removes the cart line only at
  Quantity 1), `CartItem` → `CartLine` everywhere per the CONTEXT.md
  Cart-line entry, request mapper → `cart/lib/mapCartLinesRequest.ts`,
  `dependency-graph.svg` regenerated.

## Risks

- The debounced `syncCart` is a module-level singleton; moving files keeps
  that unchanged (known ceiling, out of scope).
- `Cart.itemsMap` state field is deliberately not renamed to `linesMap`:
  redux-remember persists the slice shape and renaming would silently drop
  the persisted cart on first rehydration after upgrade.
