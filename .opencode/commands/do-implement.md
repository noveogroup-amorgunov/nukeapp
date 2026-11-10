---
description: Design a task through grilling and specs, then implement and review
---

Run spec-driven implementation for this item:

$ARGUMENTS

Read `docs/agents/development-workflow.md` and `docs/agents/issue-tracker.md`.
Resolve and read the source item per the workflow's shared execution rules; if
input is empty, ask for the intended item path.
Follow “2. Spec-driven implementation”, “Shared execution rules”, and
“Completion for both implementation paths” in the workflow document.

**Never start implementation automatically.** After the design is settled
(spec + ticket breakdown approved), stop and ask the user whether to
implement now or leave it for later; run `implement-spec` only
on an explicit yes. A "later" answer ends the run with the change path and
the current state recorded.

Load skills as their steps are reached: `grill-with-docs`, `to-spec`,
`to-tickets`, `implement-spec`, `code-review`. Preserve the interactive checkpoints
and use the repository's change artifacts instead of generic tracker publishing.
Pass `product.md` + `technical.md` as the spec and `tasks.md` as the task graph
to `implement-spec`; apply the Git rules in `AGENTS.md` and the workflow's
tracker mappings.
Finish with the change path, implementation summary, verification and review
results, and any remaining acceptance checks.
