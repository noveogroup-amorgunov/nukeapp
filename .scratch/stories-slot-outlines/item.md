---
status: needs-triage
---

# Stories: slot outlines for all slot props

Reporter: @amorgunov (maintainer), 2026-09-14.

Outgrowth of layout-refactor regression pass (Layout Common story got
red dashed outlines, see `src/shared/ui/Layout/Layout.stories.tsx` slotStyle).

## Idea

For every story whose component receives ReactNode slot props
(headerRightSlot, sidebarSlot, rightSlot, children, rightContentSlot, ...)
wrap the slot content in the same outline style as Figma Slot layers:
`border: 2px dashed #e05252; borderRadius: 8px; padding: 8px; width: 100%; height: 100%`.

## Notes

- Extract the shared style (story-only util or css module) instead of
  copy-pasting slotStyle per file.
- Applies to: shared/ui/Layout, LayoutTitleSection, LayoutHeader (if stories),
  any widget/entity stories with slots.
