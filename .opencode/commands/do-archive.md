---
description: Archive a completed change and close its source item
---

Close the completed task for this change or item:

$ARGUMENTS

Read `docs/agents/development-workflow.md` and `docs/agents/issue-tracker.md`.
Resolve the input per the workflow's shared execution rules: an item path
resolves to `.scratch/`, a change id to `docs/changes/<change-id>/`. If input
is empty, take the change directory from `docs/changes/` that is not in
`archive`; if more than one, list them and ask which one. Do not archive a
change whose `tasks.md` still has unchecked items — report them instead and
let the maintainer decide, per workflow step 1.

Follow “Completion for both implementation paths” in
`docs/agents/development-workflow.md` as the contract:

- Spec-driven: move `docs/changes/<change-id>/` to
  `docs/changes/archive/YYYY-MM-DD-<change-id>/` (date = today) and update the
  source item's link in `## Comments`.
- Direct path (no change directory): append the final handoff note directly.
- Either way, record completion in the source item's `## Comments` — keep the
  YAML triage status, no sixth status.
- Rename the item file to `NNN-✅-<slug>.md` (check emoji after the number),
  per the rule in `docs/agents/issue-tracker.md`.

When the changes are committed, the task is closed. Finish with the archive
path, item path, and any steps the agent could not complete.
