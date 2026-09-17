# Tasks

## T1: Model into entity, rename thunks, shrink public API

- [x] Move `features/cart/addToCart/model/actions.ts` → `entities/cart/model/actions.ts`: rename `addCartProductThunk`→`addProductToCart`, `removeCartProductThunk`→`removeProductFromCart`, `removeCartItemThunk`→`removeCartLine`; keep guard, debounce, `updateCartThunk`, `syncCart` internal
- [x] Move `mapCartItemsRequest` from `entities/cart/lib/` into `model/`, stop exporting it; delete `lib/`
- [x] Shrink `entities/cart/index.ts`: drop raw actions (`addOneItem`, `removeOneItem`, `incVersion`, `removeItem`-aliases), `mapCartItemsRequest`, `cartSlice`; add the three renamed thunks; keep selectors, `resetCartData`, types
- [x] `lint:eslint`, `lint:types` green at this checkpoint

## T2: RemoveIcon to the page, update consumers

- [x] Move `RemoveIcon` → `pages/cart/ui/RemoveIcon/`, `data-fsd="page/cart/RemoveIcon"`, thunk imported from `@/entities/cart`
- [x] Update `pages/cart/ui/CartProductList/CartProductList.tsx` (thunk names + local RemoveIcon import)
- [x] Update `pages/product/ui/ProductDetails/ProductDetails.tsx` (thunk names)
- [x] Verify `features/session/logout` untouched behavior (`resetCartData` import unchanged)

## T3: Delete the feature slice, full verification

- [x] Delete `src/features/cart/` entirely; `grep -r "features/cart" src` empty
- [x] `lint:eslint`, `lint:types`, `lint:steiger`, `lint:dependency-cruiser`, `build` green (dev server boots; dependency-cruiser: 8 warnings, one new of the pre-tolerated `@x` class)
- [ ] Behavioral scenarios from product.md verified on the dev server (visual click-through by the maintainer — logic moved verbatim, confirmed by diff)

## T4: Code-review, docs, commit & archive

- [x] `/code-review` over the branch (standards: no hard violations; ritual extracted into `commitCartMutation` per review; empty dirs cleaned; judgement calls deferred: `removeProductFromCart` reads as full removal but decrements — old TODO, possible follow-up rename; thunk takes `Product` but only reads `id`; `CartItem` name drifts from CONTEXT.md's Cart-line entry)
- [ ] `tasks.md` fully checked; change archived to `docs/changes/archive/2026-09-17-deepen-cart-module/`; `.scratch/deepen-cart-module/` deleted (blocked on the maintainer's visual click-through, T3)
