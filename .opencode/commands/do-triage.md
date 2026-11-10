---
description: Capture a task, research it briefly, and assign a triage status
---

Run the capture-and-triage workflow for this input:

$ARGUMENTS

Read `docs/agents/development-workflow.md`,
`docs/agents/issue-tracker.md`, and `docs/agents/triage-labels.md`.
Follow “1. Capture and triage” in the workflow document, loading the `triage`
skill with its repository-specific bounded-intake rules. If input is empty,
ask for the task text or item path. Finish with the saved item path, assigned
status, and findings or open questions.
