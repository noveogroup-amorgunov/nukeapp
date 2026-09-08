# Nukeapp

A ecommerce shop SPA: browsing the catalog, add to shopping cart, checkout and orders —
built with Feature-Sliced Design.

## Language

<!-- Terms are added lazily by /domain-modeling as they are resolved.
     Format per term:

**Term**:
One or two sentences defining what it IS, not what it does.
_Avoid_: synonym, alternative-name
-->

**Product**:
A good offered for sale in the catalog; the unit that Stock and Quantity refer to.
_Avoid_: item, good, position

**Quantity**:
The number of units of a single product currently in the shopping cart.
_Avoid_: count, amount, stocks

**Stock**:
The number of units of a product available for ordering.
_Avoid_: inStock, availability, quantity

**User**:
A person who browses the shop and authorizes into it; identified by an active session.
_Avoid_: shopper, customer, session
