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
├── model/
│   ├── slice.ts                  ← unchanged behavior; raw actions become internal
│   ├── actions.ts                ← moved from features/cart/addToCart/model/actions.ts
│   │                                (thunks renamed; syncCart debounce + request
│   │                                mapping absorbed)
│   ├── types.ts                  ← unchanged
│   └── mapCartItemsRequest.ts    ← moved from lib/, no longer exported
└── lib/                          ← deleted (only held the request mapper)

src/pages/cart/ui/RemoveIcon/     ← moved from features/cart/addToCart/ui/RemoveIcon
src/features/cart/                ← deleted entirely
```

- `entities/cart/model/actions.ts`: same three thunks, renamed —
  `addCartProductThunk` → `addProductToCart` (`Product`),
  `removeCartProductThunk` → `removeProductFromCart` (`Product`),
  `removeCartItemThunk` → `removeCartLine` (`ProductId`). The internal
  `updateCartThunk` and debounced `syncCart` stay unexported. The Stock guard
  stays inside `addProductToCart`.
- `entities/cart/index.ts` public API after the change:
  - new: `addProductToCart`, `removeProductFromCart`, `removeCartLine`
  - kept: `selectProductInCart`, `selectTotalQuantity`, `selectCartTotalPrice`,
    `selectProductsInCart`, `selectCartQuantityByProductId`, `selectCart`,
    `resetCartData`, types `Cart` / `CartItem`
  - dropped: raw actions (`addOneItem`, `removeOneItem`, `incVersion`,
    `removeItem`-aliases incl. the former `removeProductFromCart` alias),
    `mapCartItemsRequest`, `cartSlice`
  - naming collision note: the new thunk `removeProductFromCart` reuses the
    name freed by dropping the `removeItem: removeProductFromCart` alias.
- `RemoveIcon`: same implementation (`useConfirmModal` from `shared/ui`),
  `data-fsd="page/cart/RemoveIcon"`, imports the thunk from `@/entities/cart`.
  It is page-internal — not re-exported through the page slice's public API
  (consumer `CartProductList` imports it relatively, per ADR-0005 rule 5
  analogy; it is a component, not a sub-slice).
- Consumers updated (import names only):
  - `pages/product/ui/ProductDetails/ProductDetails.tsx`:
    `addProductToCart`, `removeProductFromCart`
  - `pages/cart/ui/CartProductList/CartProductList.tsx`:
    `addProductToCart`, `removeProductFromCart` + local `RemoveIcon`
  - `features/session/logout/model/logout.ts`: `resetCartData` (unchanged)
- Slices' `data-fsd` and all CSS stay byte-identical.

## Risks

- The debounced `syncCart` is a module-level singleton; moving files keeps
  that unchanged (known ceiling, out of scope).
- `removeProductFromCart` name reuse: after dropping raw-action exports the
  index has a single meaning per name; verified by reading the final index.
