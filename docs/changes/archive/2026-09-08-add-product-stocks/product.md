# Product stocks — product spec

id: add-product-stocks
status: done

## Why

Users see products they cannot actually order: the catalog says nothing
about availability, and the cart allows more units than the shop can ship.
A demo shop still needs believable availability behavior.

## What

Products carry a **Stock** — the number of units available for ordering
(see `CONTEXT.md`). Availability is derived from Stock: zero Stock means the
product is out of stock.

### Catalog card

- When Stock = 0: price is replaced by "Out of stock", the whole card is
  rendered at 50% opacity.
- When Stock = 1: a "Only 1 left" badge is shown on the card.
- Otherwise: no availability info on the card.
- Out-of-stock cards stay clickable (lead to the product page) and the
  wishlist action keeps working — only purchasing is disabled.

### Product page

- When Stock = 0: the add-to-cart button is not rendered at all; the same
  "Out of stock" / badge rules as on the card apply to availability info.
- Otherwise: same badge rule as the card ("Only 1 left" only when Stock = 1).

### Cart

- **Quantity** of a product in the cart must never exceed its **Stock**.
  The add-to-cart action is blocked at the model level (thunk guard) when
  Quantity would exceed Stock, and the UI does not offer the action:
  on the product page the "+" action is dimmed and a "No more" hint appears
  in the button when Quantity = Stock > 0.
- On the cart page (compact stepper) there is no hint; "+" simply stops
  having an effect.

## Behavioral scenarios

```gherkin
Scenario: Card without stock
  Given a product with Stock = 0 in the catalog
  When the catalog renders its card
  Then the card shows "Out of stock" instead of the price
  And the card is rendered at 50% opacity
  And clicking the card opens the product page

Scenario: Single unit left
  Given a product with Stock = 1
  When its card or product page renders
  Then a "Only 1 left" badge is visible

Scenario: Add to cart up to Stock
  Given a product with Stock = 2
  And an empty cart
  When the user adds the product twice
  Then the cart Quantity for the product is 2

Scenario: Add beyond Stock is blocked
  Given a product with Stock = 2
  And the product is in the cart with Quantity = 2
  When the user tries to add one more unit (on the product page or in the cart)
  Then the cart Quantity stays 2
  And on the product page the "+" action is dimmed with a "No more" hint

Scenario: Out-of-stock product page
  Given a product with Stock = 0
  When the user opens the product page
  Then no add-to-cart control is rendered
```

## Out of scope

- Server-side cart validation against stock (mock backend only)
- Runtime stock changes (decrement on purchase, re-fetch, race conditions) —
  Stock is static within a session
- Stock deduction on order/checkout (checkout does not exist)
- Tooltip on the cart page explaining why "+" has no effect
