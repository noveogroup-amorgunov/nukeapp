---
status: needs-triage
---

# Banner persist: remember dismissed announcement

Reporter: @amorgunov (maintainer), 2026-09-14.

Outgrowth of `layout-refactor` grilling (round 3, Q3).

## Idea

The Layout banner (announcement, Figma frame 25:2025, close icon 25:2882) becomes
dismissable via local state in this refactor. Persist the dismissed flag across
reloads (localStorage or redux-remember-persisted slice) so the banner does not
reappear on every visit.

## Notes

- Decide storage location (localStorage key vs persisted redux slice).
- Consider expiry/reset strategy (re-show on new announcement text?).
