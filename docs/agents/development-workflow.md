# Development workflow

How development is done in this repository (ADR-0001): three entry workflows,
the change lifecycle, and the process vocabulary. Skills are installed in `.agents/skills/`,
versions are pinned in `skills-lock.json`, and restored via `pnpm run setup`. Domain
terms live separately in the `GLOSSARY.md` glossary; this file covers process
language only.

## The mental model

```text
docs/changes/       WHAT changed (one directory per change)
docs/adr/           WHY durable technical/process decisions were made
docs/product.md     WHAT the system supports now
docs/architecture.md  HOW the system is structured now
.scratch/           transient inbox: raw incoming, wayfinder maps, research
```

Changes are events. ADRs are decisions. Product and Architecture are the current
state. Skills are engineering capabilities applied situationally — never run every
skill for every change, and never run a second orchestration framework on top of
the skills.

## Three entry workflows

Project commands live in `.opencode/commands/` and invoke installed skills using
the repository rules below. Load each skill when its step is reached; a command
is a prompt entry point, not an automatic shell pipeline.

| Command                                | Purpose                                                                       | Skill sequence                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `/do-triage <text or item path>`       | Capture and investigate incoming work                                         | `/triage` (bounded intake, described below)                                          |
| `/do-implement <item path>`            | Design and implement through a spec                                           | `/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement-spec` → `/code-review` |
| `/do-fast-implement <item path>`       | Implement directly from an actionable item                                    | `/implement` → `/code-review`                                                        |
| `/do-archive <change-id or item path>` | Close a completed task: archive the change, record completion, check the item | —                                                                                    |

Examples:

```text
/do-triage Add toast notifications for cart updates
/do-implement .scratch/012-add-toast-system.md
/do-fast-implement .scratch/013-fix-toast-dismiss.md
```

`/grill-with-docs` is the grilling entry point (the similarly named `grill-me`
is a skill router, not the interview). Triage creates an item; the user selects
an implementation workflow separately. Both implementation paths require
verification and `/code-review` before commit.

### 1. Capture and triage — `/do-triage`

1. Read `docs/agents/issue-tracker.md` and `docs/agents/triage-labels.md`.
   For new text, create the next free `.scratch/NNN-<slug>.md` with
   `status: needs-triage`; for a referenced item, read and update that file.
2. Use `/triage` to inspect relevant code and docs, existing items, and prior
   rejections. Keep research bounded to establishing scope, whether the requested
   behavior already exists, and what an implementer still needs. For bugs, record
   reproduction evidence or why reproduction was not possible.
3. Save the request, category (`bug` or `enhancement`), findings with file
   references, acceptance criteria, blockers, and unresolved questions. Assign
   exactly one status from `triage-labels.md`, with the reason in `## Comments`.
   `ready-for-agent` requires an actionable brief; uncertainty stays explicit.
4. Return the item path, status, and a short summary of findings or questions.
   Intake ends here, before implementation.

This command authorizes applying the evidence-backed triage status directly.
Unlike standalone `/triage`, it ends after bounded research: missing information
is recorded as `needs-info` rather than starting a grilling session. Preserve
the skill's brief and attribution conventions after YAML frontmatter.

### 2. Spec-driven implementation — `/do-implement`

Read the source item and its comments, inspect the relevant code, then run the
sequence below. Resolve outstanding product and design questions with the user
through `/grill-with-docs`; advance once scope, acceptance criteria, and technical
decisions are settled. Honor the skills' user checkpoints for test seams and task
breakdown. Resume existing change artifacts rather than creating a duplicate.

After the spec and task breakdown are approved, ask whether to implement now or
leave the change for later. Start `/implement-spec` only when implementation is
explicitly authorized; otherwise record the change path and current state.

This path creates a change in `docs/changes/<change-id>/`:

```text
docs/changes/<change-id>/
├── product.md     WHY + WHAT (product/behavioral spec)
├── technical.md   HOW (technical design)
└── tasks.md       EXECUTION (task graph with checkboxes, persistent progress state)
```

`<change-id>` is short kebab-case reflecting intent (`add-product-favorites`,
`fix-cart-race-condition`, `migrate-api-client`). A change is a self-contained
context scope: `Implement change add-product-favorites` is enough for a fresh
session to start.

Lifecycle:

```text
triaged item (.scratch/)
  → /grill-with-docs            sharpen the idea with the user
  → /to-spec                    product.md + technical.md of the change
  → /to-tickets                 task graph in tasks.md
  → user checkpoint            implement now or leave for later
  → /implement-spec            frontier tasks in isolated worktrees via /tdd
  → /code-review                complete change, plus review before every commit
  → update docs/product.md / docs/architecture.md / ADRs if the current state changed
  → archive the whole directory to docs/changes/archive/YYYY-MM-DD-<change-id>/
```

- `/to-spec` collapses the grilling conversation into the change's `product.md`
  (WHY + WHAT) and `technical.md` (HOW), rather than publishing another inbox item.
- `/to-tickets` writes each task into `tasks.md` instead of separate ticket
  files. Each task has a stable ID, a completion checkbox, the behavior it
  delivers, acceptance criteria, and `Blocked by:` task IDs (or `None`). Keep
  the skill's vertical slices and dependency rules. Unchecked, unclaimed tasks
  whose blockers are complete form the frontier; resume from that frontier.
- Behavioral scenarios (Given/When/Then) go into `product.md` for requirements
  that must be unambiguously verifiable; they are the input for tests and
  `/tdd`.
- These repository artifact mappings override the generic skills' publishing
  defaults. Once the change exists, link it from the source item's `## Comments`.

#### Running `/implement-spec`

Pass the change's `product.md` and `technical.md` as the spec, and `tasks.md` as
its tickets. Apply the Git rules in `AGENTS.md`; the rules below map the skill
onto this repository's artifacts and local tracker.

- Follow `/implement-spec` for integration branches, per-task branches and
  isolated worktrees. Run independent frontier tasks concurrently, with a fresh
  implementer for each task and `/tdd` at the agreed seams. Pass context pointers
  to the spec, task ID, and relevant commits.
- Integrate each completed task into the feature's integration branch using the
  skill's merge process. Complete the final review on that branch and clean up
  implementation worktrees after integration.
- The coordinator owns `tasks.md`: record the claim before dispatch and the
  acceptance results after implementation. Mark a task complete only when its
  acceptance criteria pass and its work is integrated. Implementers report
  results to the coordinator; they do not edit the shared task graph.
- On resume, reconcile recorded claims with live agents, the integration checkout
  and task worktrees before dispatching more work. Retain incomplete tasks and
  their handoff notes;
  completion checkboxes are the durable state, separate from triage roles.
- Run `/code-review` before every agent commit and over the complete change at
  the end. Fix final review findings through a fresh implementer as the skill
  directs, then verify the result and review the fixes.
- Close the change through the completion rules below and `/do-archive`.
  This local tracker does not require a PR; create one only when requested,
  following the repository's PR rules.

If the user requests preparation without commits, leave a reviewable working
tree and report verification results and any remaining work. This overrides
the skills' commit steps.

### 3. Direct implementation — `/do-fast-implement`

1. Use the item's acceptance criteria as the implementation and review contract.
2. Run `/implement` directly. This path skips grilling, `/to-spec`, and
   `/to-tickets`; it creates no change directory. Keep a handoff note in the
   item's `## Comments`, with acceptance checkboxes as the remaining-work
   state, so another session can resume.
3. Run the relevant checks and `/code-review` against the source item. Complete
   the shared closure steps below.

Use this path when scope and acceptance criteria are already actionable. If a
blocking ambiguity emerges, record it and ask the specific question needed to
continue; switch to the spec-driven path only with the user's agreement.
Use `/tdd` at existing test seams. Fast execution still includes
verification and review.

### Shared execution rules

- Read the referenced item before starting either implementation path; resolve a
  shortened path only when it matches exactly one existing item, otherwise ask
  for the intended path. Respect unresolved `Blocked by:` dependencies. An item
  marked `wontfix` or `ready-for-human` needs an explicit maintainer override
  before agent execution.
- Capture the starting commit and pre-existing working-tree changes for review.
  Review all changes made by this run against its source item or change spec,
  including untracked files, and keep unrelated user work outside the review scope.
- `/implement` and `/implement-spec` already include `/code-review`; that
  satisfies the final step when it covers the complete diff. Address findings and recheck affected work
  before committing with a conventional-commit prefix. Include closure docs in
  the reviewed diff; review later edits before committing them.
- Apply the repository artifact and closure rules when using generic skills.

Raw items carry their triage status in YAML frontmatter:

```yaml
---
category: enhancement
status: needs-triage
---
```

## Scenarios

### Feature

Raw ideas enter through `/do-triage`, then use either implementation path above.
In the spec-driven path, `/grill-with-docs` writes domain terms into
`GLOSSARY.md` and durable decisions into `docs/adr/` as they crystallise. If a
question needs a runnable answer, detour through `/prototype`; the conclusions
go into `technical.md` or an ADR.

### Bug

Incoming bugs and requests land in `.scratch/` through `/do-triage`.
An actionable bugfix can use direct implementation; bugs needing design use the
spec-driven path (e.g. `fix-cart-race-condition/`). Hard bugs go to
`/diagnosing-bugs`: establish a tight feedback loop first, then fix with a
regression test.

### ADR

Via `/grill-with-docs` + `/domain-modeling`. An ADR is only created when the
decision is hard to reverse, surprising without context, and the result of a real
trade-off. The format is a short document with a metadata block:

```yaml
---
status: accepted
date: 2026-09-08
supersedes:
  - ADR-0002
---
```

`supersedes` is only included when there are ADRs being replaced. A change never
duplicates an ADR: local design decisions live in `technical.md`; only decisions
that should outlive the change go to `docs/adr/`.

### Wayfinder

Large foggy efforts (a greenfield project or a huge feature build that doesn't
fit in one session): `/wayfinder` charts a map of decision tickets under
`.scratch/<effort>/` and resolves them one at a time. The map is never handed
straight to `/implement-spec` — its decisions collapse into a change directory
(product.md / technical.md / tasks.md) and the normal lifecycle takes over.

### Codebase health

`/improve-codebase-architecture` — ongoing upkeep: it surfaces deepening
opportunities; the one you pick becomes a seed idea for the Feature scenario.

## Completion for both implementation paths

Do not turn persistent docs into a changelog — update them only when the current
state actually changed:

1. Verify the work and complete `tasks.md` (spec-driven) or the source item's
   acceptance checkboxes (direct). Acceptance items that require a
   browser or the maintainer's environment (e.g. Chromium-only APIs, native
   dialogs, permissions) stay unchecked until the maintainer verifies them;
   `agent`-run tests do not substitute for that smoke. Keep the item or change
   open while such items remain; record the outstanding checks in the handoff.
2. Update `docs/product.md` if product capabilities appeared, disappeared, or
   changed substantially.
3. Update `docs/architecture.md` if high-level architecture changed (new layer,
   state management approach, API interaction method, subsystem boundaries,
   rendering model, persistence model) — not implementation details.
4. Create or update ADRs for durable decisions.
5. For spec-driven work, move the whole completed change directory to
   `docs/changes/archive/YYYY-MM-DD-<change-id>/` — the archive is
   immutable-ish; do not edit archived changes. Update the source item's link.
6. For direct work, append the final handoff note (completion and verification
   results) to the item's `## Comments`. Triage roles describe readiness, not
   completion: use this note rather than inventing a sixth triage status. A
   completed or superseded item is no longer pending work. `.scratch/` is
   gitignored; the reviewed code and persistent docs are the durable output.

Steps 5–6 are exactly what `/do-archive` does — run it instead of doing the
closure manually.

### Post-archive regressions

Once a change is archived, regressions found in it are fixed directly —
no reopening the archived directory: fix commits on the relevant branch
(fix/chore/refactor prefixes) plus a fresh `/code-review` over the branch.
New ideas that grow out of the work (follow-ups, refinements that are not
regressions) become their own raw items in `.scratch/` and go through `/triage`
again; do not append them to the archived change.

## Process vocabulary

**Grilling**: an interview until shared understanding is reached; questions come
in rounds over the frontier, the agent collects facts, the human makes decisions.
_Avoid_: interview

**Change**: a self-contained unit of work in `docs/changes/<change-id>/` —
product spec, technical design, and execution checklist in one directory.
_Avoid_: ticket (for the whole unit), feature folder, epic

**Spec**: the pair `product.md` (WHY + WHAT) and `technical.md` (HOW) inside a
change, produced by `/to-spec`.
_Avoid_: requirements, task list

**Task**: one identified unit in a change's `tasks.md`, produced by `/to-tickets`,
with a completion checkbox, acceptance criteria, and blocking edges. This is
what `/implement-spec` calls a ticket. Checkboxes and claims record execution state.
_Avoid_: ticket, subtask

**Frontier**: the unchecked, unclaimed tasks whose blockers are all complete;
these tasks are available for implementation.

**Agent-ready item**: a raw incoming item that has passed triage and can be
implemented directly without further human involvement. The user can instead
choose spec-driven implementation for additional design work.

**Handoff note**: the running record in an item's `## Comments` — progress,
decisions, verification results, remaining work — that lets a later session
resume where the last one stopped.

**Map**: the wayfinder map — a file holding child decision tickets under
`.scratch/`; it produces decisions, not deliverables.

**Triage role**: a category (`bug` or `enhancement`) or a state
(`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`).
Each triaged incoming item has one of each; the mapping lives in
`docs/agents/triage-labels.md`.

**Prototype**: a throwaway program that answers a single design question; the
answer folds into `technical.md` or an ADR, the prototype stays as a primary
source.

**Deepening opportunity**: an architecture improvement candidate found by
`/improve-codebase-architecture` — a deep module behind a small interface.
