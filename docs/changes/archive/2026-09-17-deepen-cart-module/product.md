# Deepen the Cart module (absorb features/cart into entities/cart)

## Problem Statement

The Cart module is split across 4 layers and 8 files: state and reducers in
`entities/cart`, business logic (Stock guard, debounce, server sync) in
`features/cart/addToCart/model/actions.ts`, the remove-line icon with its
confirm modal in the same feature. The entity's interface is 12+ exports, of
which 5 raw actions and the request mapper (`mapCartItemsRequest`) leak outward
only so the feature can build the PATCH body. Every thunk repeats the ritual
`dispatch(reducer) → dispatch(incVersion) → syncCart(...)`; forgetting
`incVersion` silently breaks server version reconciliation and nothing tests
it (the repo has no test suite).

## Solution

- Move the mutation logic (thunks, Stock guard, debounce, request mapping)
  into `entities/cart`; the feature slice is deleted entirely — its consumer
  analysis confirmed nothing else would remain.
- Rename the thunks to entity-owned domain verbs (see technical.md).
- Move `RemoveIcon` (confirm modal + line removal) into `pages/cart/ui/` —
  its only consumer is the cart page's product list.
- `shared/ui` stays untouched: the view-side recomputation of
  `maxQuantityIsReached` from props stays as-is (derived display flag; the
  authoritative guard lives in the entity thunk).

## User Stories

1. As a developer, I want the cart entity to own its mutations, so that the
   Stock rule, the version ritual and the debounce live in one place.
2. As a developer, I want a small public API (3 thunks + selectors + reset),
   so that adding a cart operation means one function, not a copy of the
   three-step dance.
3. As a developer, I want the remove-confirm icon to live with the page that
   renders it, so that a page-only UI unit does not occupy the feature layer.
4. As a visitor, I want the cart to behave exactly as before (optimistic
   updates, debounced PATCH, version reconciliation), so that the refactor
   changes nothing observable.

## Behavioral scenarios

- Given a product with Stock 2 and Quantity 2 in the cart, when the add
  operation runs, then the state does not change (guard, moved from the
  feature thunk, behaves identically).
- Given a quantity increase, when no further mutation happens for 1.5s, then
  exactly one PATCH /cart is sent with the current items and version.
- Given a server response with `version >= state.version`, when getCart
  fulfills, then the local state is reconciled (unchanged behavior).
- Given the user confirms removal of a cart line, when the confirm modal is
  accepted, then the line is removed and the debounced sync fires (unchanged
  behavior, now owned by the page).
- Given logout, when the reset thunk runs, then cart data resets via the
  unchanged `resetCartData` export.

## Out of Scope

- `shared/ui` (`CartProductCard`, `AddToCartButton`, `ProductCard`): the
  view-side `maxQuantityIsReached` / `soldOut` recomputation stays.
- `pages/product` UI (login gate, "added to bag" modal) — only thunk import
  names update.
- Introducing cart tests (architecture-review candidate №6, separate item).
- Wishlist / `fixedCacheKey` contract (candidate №4).

## Further Notes

- Source: architecture review 2026-09-16, candidate №1; triage decisions in
  `.scratch/deepen-cart-module/item.md` (deleted when the change is archived).
- Naming: ADR-0003 untouched — cart keeps importing the raw `useGetCartQuery`
  hook from `shared/api` directly.
