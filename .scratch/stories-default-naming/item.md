---
status: needs-triage
---

# Stories: default story naming = Default

Reporter: @amorgunov (maintainer), 2026-09-14.

Outgrowth of layout-refactor regression pass.

## Idea

Rename the default story from `Common` to `Default` across all story files and
remove the `Common` name everywhere (`grep -rn "export const Common" src --include="*.stories.tsx"`).

## Notes

- Only the first/default story in each file; other story names untouched.
- Check storybook sidebar sorting after rename (Default on top).
